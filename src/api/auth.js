export default function (instance) {
  return {
    signIn (payload) {
      const data = instance.post('auth', payload)
      return data
    },
    signUp (payload) {
      return instance.get('register', payload)
    },
    logout () {
      return instance.delete('auth')
    }
  }
}
