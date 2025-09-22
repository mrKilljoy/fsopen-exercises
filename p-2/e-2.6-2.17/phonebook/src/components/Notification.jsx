const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const style = isError ? 'error' : 'message';

  return (
    <div className={style}>
      {message}
    </div>
  )
}

export default Notification;