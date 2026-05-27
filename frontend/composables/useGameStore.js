// Claves usadas para guardar datos en localStorage.
const keys = {
  cart: 'gamesvue_cart',
  currentUser: 'gamesvue_current_user'
}

// Crea una copia simple para evitar modificar el original.
const copy = (value) => JSON.parse(JSON.stringify(value))

// Comprueba si el usuario tiene permisos de administrador.
const hasAdminRole = (user) => Number(user?.is_admin) === 1

// Store compartido por todas las paginas y componentes.
export const useGameStore = () => {
  const config = useRuntimeConfig()
  // Estados globales reactivos de Nuxt.
  const games = useState('gamesvue_games', () => [])
  const users = useState('gamesvue_users', () => [])
  const cart = useState('gamesvue_cart', () => [])
  const currentUser = useState('gamesvue_current_user', () => null)

  // Helper para llamar a la API PHP.
  const api = async (path, options = {}) => (
    await $fetch(`${config.public.apiBase}${path}`, options)
  )

  // Lee datos locales solo en el navegador.
  const read = (key, defaultValue) => {
    if (!process.client) {
      return copy(defaultValue)
    }

    const savedValue = localStorage.getItem(key)
    return savedValue ? JSON.parse(savedValue) : copy(defaultValue)
  }

  // Guarda datos locales solo en el navegador.
  const write = (key, value) => {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  // Trae el catalogo desde MySQL mediante la API.
  const loadGames = async () => {
    const response = await api('/games')
    games.value = response.games || []
  }

  // Trae usuarios solo para la parte de administracion.
  const loadUsers = async () => {
    const response = await api('/users')
    users.value = response.users || []
  }

  // Carga usuario, carrito y datos principales.
  const loadData = async () => {
    cart.value = read(keys.cart, [])
    currentUser.value = read(keys.currentUser, null)

    await loadGames()

    if (hasAdminRole(currentUser.value)) {
      await loadUsers()
    }
  }

  // Sincroniza el carrito con localStorage.
  const saveCart = () => write(keys.cart, cart.value)

  // Inicia sesion contra la API.
  const login = async (email, password) => {
    try {
      const response = await api('/login', {
        method: 'POST',
        body: { email, password }
      })

      currentUser.value = response.user
      write(keys.currentUser, currentUser.value)

      if (hasAdminRole(currentUser.value)) {
        await loadUsers()
      }

      return true
    } catch {
      return false
    }
  }

  // Cierra sesion y limpia datos locales.
  const logout = () => {
    currentUser.value = null
    users.value = []
    cart.value = []

    if (process.client) {
      localStorage.removeItem(keys.currentUser)
      localStorage.removeItem(keys.cart)
    }
  }

  // Crea un usuario normal desde registro.
  const registerUser = async (userData) => {
    try {
      const response = await api('/register', {
        method: 'POST',
        body: userData
      })

      if (response.user) {
        currentUser.value = response.user
        write(keys.currentUser, currentUser.value)
      }

      return true
    } catch {
      return false
    }
  }

  // Anade un juego al carrito si hay stock.
  const addToCart = (game) => {
    if (game.stock <= 0) {
      return
    }

    const item = cart.value.find((cartItem) => cartItem.id === game.id)

    if (item) {
      if (item.quantity < game.stock) {
        item.quantity++
      }
    } else {
      cart.value.push({
        id: game.id,
        title: game.title,
        price: game.price,
        image: game.image,
        quantity: 1
      })
    }

    saveCart()
  }

  // Elimina una linea completa del carrito.
  const removeFromCart = (gameId) => {
    cart.value = cart.value.filter((item) => item.id !== gameId)
    saveCart()
  }

  // Crea un juego desde el panel admin.
  const createGame = async (gameData) => {
    const response = await api('/games', {
      method: 'POST',
      body: gameData
    })

    if (response.game) {
      games.value.push(response.game)
    }
  }

  // Actualiza un juego y tambien refresca el carrito.
  const updateGame = async (gameData) => {
    const response = await api(`/games/${gameData.id}`, {
      method: 'PUT',
      body: gameData
    })

    const index = games.value.findIndex((game) => game.id === gameData.id)

    if (index !== -1 && response.game) {
      games.value[index] = response.game
    }

    cart.value = cart.value.map((item) => (
      item.id === gameData.id && response.game
        ? { ...item, title: response.game.title, price: response.game.price, image: response.game.image }
        : item
    ))
    saveCart()
  }

  // Borra un juego del catalogo y del carrito.
  const deleteGame = async (gameId) => {
    await api(`/games/${gameId}`, {
      method: 'DELETE'
    })

    games.value = games.value.filter((game) => game.id !== gameId)
    cart.value = cart.value.filter((item) => item.id !== gameId)
    saveCart()
  }

  // Actualiza datos de un usuario.
  const updateUser = async (userData) => {
    const response = await api(`/users/${userData.id}`, {
      method: 'PUT',
      body: userData
    })

    const index = users.value.findIndex((user) => user.id === userData.id)

    if (index !== -1 && response.user) {
      users.value[index] = response.user
    }

    if (currentUser.value?.id === userData.id && response.user) {
      currentUser.value = response.user
      write(keys.currentUser, currentUser.value)
    }
  }

  // Borra usuarios desde administracion.
  const deleteUser = async (userId) => {
    await api(`/users/${userId}`, {
      method: 'DELETE'
    })

    users.value = users.value.filter((user) => user.id !== userId)

    if (currentUser.value?.id === userId) {
      logout()
    }
  }

  // Finaliza compra, guarda historial y descuenta stock.
  const checkoutCart = async () => {
    if (!currentUser.value) {
      throw new Error('inicia sesion para finalizar la compra')
    }

    const response = await api('/checkout', {
      method: 'POST',
      body: {
        user_id: currentUser.value.id,
        items: cart.value.map((item) => ({
          id: item.id,
          quantity: item.quantity
        }))
      }
    })

    cart.value = []
    saveCart()
    await loadGames()

    return response.compra
  }

  // Total calculado automaticamente desde el carrito.
  const cartTotal = computed(() => (
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  ))

  // Permiso reactivo para mostrar u ocultar admin.
  const isAdmin = computed(() => hasAdminRole(currentUser.value))

  // Todo lo que pueden usar paginas y componentes.
  return {
    games,
    users,
    cart,
    currentUser,
    cartTotal,
    isAdmin,
    loadData,
    login,
    logout,
    registerUser,
    addToCart,
    removeFromCart,
    createGame,
    updateGame,
    deleteGame,
    updateUser,
    deleteUser,
    checkoutCart
  }
}
