// import main from '../assets/images/main.svg'
import {Link} from 'react-router-dom'
import main from '../assets/images/main-alternative.svg'
import styled from 'styled-components'
import {Logo} from '../components'
const Landing = () => {
  return (
    <Wrapper>
      <nav> 
        <Logo/>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking </span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum,
            eligendi laboriosam. Minus laborum natus illum ut vel praesentium
            esse? Recusandae, ratione? Ad nesciunt quidem ducimus minus quisquam
            earum quod, error delectus beatae tenetur officiis odit, nobis iste
            quo voluptate, nihil nostrum iusto a fugiat nam blanditiis
            quibusdam? Magnam perferendis velit nisi voluptatem explicabo und.
          </p>
        <Link to='/register' className="btn btn-hero">Login/register</Link>         
        </div>
        <img src={main} alt="" className="img main-img" />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width); 
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`

export default Landing
