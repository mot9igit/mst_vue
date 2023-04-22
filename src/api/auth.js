export default function (instance) {
  return {
    signIn (payload) {
      const data = instance.post('auth/', payload).then(function (res) {
        return res
      }).catch(function (err) {
        // TODO: подключить компонент обработки ошибок
        console.log(err)
        alert('Ошибка попробуйте позже.')
      })
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
