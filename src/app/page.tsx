import Banner from '../components/Banner/Banner';
import Companies from '../components/Companies/Companies';
import Proof from '../components/Proof/index';
import Pricing from '../components/Pricing/index';
import Question from '../components/Question/index';
import CTA from '../components/CTA/index';
import Buyers from '../components/Buyers/index';
import Provide from '../components/Provide/index';
import Howitworks from '../components/Howitworks/index';
import Network from '../components/Network/index';
import Contact from '../components/Contact/index';
import Clientsay from '../components/Clientsay/index';
import Newsletter from '../components/Newsletter/Newsletter';


export default function Home() {
  return (
    <main>
      <Banner />
      {/* <Companies /> */}
      <Howitworks />
      <Proof />
      {/* <Buyers /> */}
      {/* <Provide /> */}
      <Pricing />
      <Question />
      <CTA />
     
      <Contact />
      {/* <Network /> */}
      {/* <Clientsay /> */}
      {/* <Newsletter /> */}
    </main>
  )
}
