import { Toaster as ReactToaster } from 'react-hot-toast'


const Toaster = () => {
  return (
    <ReactToaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#171b2f',
          color: '#fff',
        },
      }}
    />
  )
}

export default Toaster