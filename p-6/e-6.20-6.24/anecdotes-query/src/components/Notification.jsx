import { useContext } from 'react'
import AppContext from '../AppContext'

const Notification = () => {
  const { notification } = useContext(AppContext);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  console.log('n-rend', notification)

  if (!notification || notification.length < 1) return null;

  return (
    <div style={style}>
      {notification}
    </div>
  )
};

export default Notification;