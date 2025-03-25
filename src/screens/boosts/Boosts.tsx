import BoostsList from '../../components/boosts-list/BoostsList'

const Boosts = () => {
  return (
    <div className='p-5 py-8 h-full'>
      <h2 className='text-3xl font-semibold mb-2'>Прокачай возможности</h2>
      <p className='text-sm text-secondary'>Выбери понравившийся буст</p>

      <BoostsList />
    </div>
  )
}

export default Boosts