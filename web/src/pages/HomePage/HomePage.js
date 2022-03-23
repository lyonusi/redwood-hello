// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1 className="rw-heading rw-heading-primary">This is the home page.</h1>

      <ArticlesCell />
    </>
  )
}

export default HomePage
