const isConnected = () => {
  return new Promise(resolve => {
    if (!navigator.onLine) resolve('offline')
    else {
      fetch('https://www.google.com/', { mode: 'no-cors' })
        .then(() => resolve('connected'))
        .catch(() => resolve('disconnected'))
    }
  })
}

const waitFor = ms =>
  new Promise(resolve => setTimeout(_ => resolve('timedOut'), ms))

export const checkConnection = async () => {
  return Promise.race([isConnected(), waitFor(5000)])
    .then(result => {
      // console.log(result)
      return result
    }).catch(error => {
      // console.log('An error occured')
      return error
    })
}

export const usage = async () => {
  const i = await checkConnection()
  if (i === 'offline') return console.log('is offline')
  if (i === 'connected') return console.log('is connected')
  if (i === 'disconnected') return console.log('is disconnected')
  if (i === 'timedOut') return console.log('is timedOut')
  else return console.log('error')
}
