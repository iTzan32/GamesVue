const keys = {
  cart: 'gamesvue_cart',
  currentUser: 'gamesvue_current_user'
}

const copy = (value) => JSON.parse(JSON.stringify(value))

const hasAdminRole = (user) => Number(user?.is_admin) === 1

export const useGameStore = () => {
  const config = useRuntimeConfig()
  const games = useState('gamesvue_games', () => [])
  const users = useState('gamesvue_users', () => [])
  const cart = useState('gamesvue_cart', () => [])
  const currentUser = useState('gamesvue_current_user', () => null)

  const api = async (path, options = {}) => (
    await $fetch(`${config.public.apiBase}${path}`, options)
  )

  const read = (key, defaultValue) => {
    if (!process.client) {
      return copy(defaultValue)
    }

    const savedValue = localStorage.getItem(key)
    return savedValue ? JSON.parse(savedValue) : copy(defaultValue)
  }

  const write = (key, value) => {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const loadGames = async () => {
    const response = await api('/games')
    games.value = response.games || []
  }

  const loadUsers = async () => {
    const response = await api('/users')
    users.value = response.users || []
  }

  const loadData = async () => {
    cart.value = read(keys.cart, [])
    currentUser.value = read(keys.currentUser, null)

    await loadGames()

    if (hasAdminRole(currentUser.value)) {
      await loadUsers()
    }
  }

  const saveCart = () => write(keys.cart, cart.value)

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

  const logout = () => {
    currentUser.value = null
    users.value = []
    cart.value = []

    if (process.client) {
      localStorage.removeItem(keys.currentUser)
      localStorage.removeItem(keys.cart)
    }
  }

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

  const removeFromCart = (gameId) => {
    cart.value = cart.value.filter((item) => item.id !== gameId)
    saveCart()
  }

  const createGame = async (gameData) => {
    const response = await api('/games', {
      method: 'POST',
      body: gameData
    })

    if (response.game) {
      games.value.push(response.game)
    }
  }

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

  const deleteGame = async (gameId) => {
    await api(`/games/${gameId}`, {
      method: 'DELETE'
    })

    games.value = games.value.filter((game) => game.id !== gameId)
    cart.value = cart.value.filter((item) => item.id !== gameId)
    saveCart()
  }

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

  const deleteUser = async (userId) => {
    await api(`/users/${userId}`, {
      method: 'DELETE'
    })

    users.value = users.value.filter((user) => user.id !== userId)

    if (currentUser.value?.id === userId) {
      logout()
    }
  }

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

  const cartTotal = computed(() => (
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  ))

  const isAdmin = computed(() => hasAdminRole(currentUser.value))

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
