import Navigation from 'src/components/Navigation/Navigation'

const GlobalLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}

export default GlobalLayout
