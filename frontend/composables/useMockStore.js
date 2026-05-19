import { mockGames } from '~/data/mockGames'
import { mockUsers } from '~/data/mockUsers'

const keys = {
  games: 'gamesvue_games',
  users: 'gamesvue_users',
  cart: 'gamesvue_cart',
  currentUser: 'gamesvue_current_user'
}

const copy = (value) => JSON.parse(JSON.stringify(value))

export const useMockStore = () => {
  const games = useState('gamesvue_games', () => copy(mockGames))
  const users = useState('gamesvue_users', () => copy(mockUsers))
  const cart = useState('gamesvue_cart', () => [])
  const currentUser = useState('gamesvue_current_user', () => null)

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

  const loadData = () => {
    games.value = read(keys.games, mockGames)
    users.value = read(keys.users, mockUsers)
    cart.value = read(keys.cart, [])
    currentUser.value = read(keys.currentUser, null)
  }

  const saveGames = () => write(keys.games, games.value)
  const saveUsers = () => write(keys.users, users.value)
  const saveCart = () => write(keys.cart, cart.value)

  const login = (email, password) => {
    const user = users.value.find((item) => item.email === email && item.password === password)

    if (!user) {
      return false
    }

    currentUser.value = {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin
    }

    write(keys.currentUser, currentUser.value)
    return true
  }

  const logout = () => {
    currentUser.value = null

    if (process.client) {
      localStorage.removeItem(keys.currentUser)
    }
  }

  const registerUser = (userData) => {
    const emailExists = users.value.some((user) => user.email === userData.email)

    if (emailExists) {
      return false
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      is_admin: 0
    }

    users.value.push(newUser)
    saveUsers()
    return true
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

  const createGame = (gameData) => {
    games.value.push({
      ...gameData,
      id: Date.now(),
      price: Number(gameData.price),
      stock: Number(gameData.stock)
    })
    saveGames()
  }

  const updateGame = (gameData) => {
    const index = games.value.findIndex((game) => game.id === gameData.id)

    if (index !== -1) {
      games.value[index] = {
        ...gameData,
        price: Number(gameData.price),
        stock: Number(gameData.stock)
      }
      saveGames()
    }
  }

  const deleteGame = (gameId) => {
    games.value = games.value.filter((game) => game.id !== gameId)
    cart.value = cart.value.filter((item) => item.id !== gameId)
    saveGames()
    saveCart()
  }

  const updateUser = (userData) => {
    const index = users.value.findIndex((user) => user.id === userData.id)

    if (index !== -1) {
      users.value[index] = {
        ...userData,
        is_admin: Number(userData.is_admin)
      }

      if (currentUser.value?.id === userData.id) {
        currentUser.value = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          is_admin: Number(userData.is_admin)
        }
        write(keys.currentUser, currentUser.value)
      }

      saveUsers()
    }
  }

  const deleteUser = (userId) => {
    users.value = users.value.filter((user) => user.id !== userId)

    if (currentUser.value?.id === userId) {
      logout()
    }

    saveUsers()
  }

  const cartTotal = computed(() => (
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  ))

  const isAdmin = computed(() => currentUser.value?.is_admin === 1)

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
    deleteUser
  }
}
