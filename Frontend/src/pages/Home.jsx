import Banner from "../components/Banner"
import Category from "../components/Category"
import ExploreSection from "../components/ExploreSection"
import Products from "../components/Products"
import ChatbotShowcase from "../components/ChatbotShowcase"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chatbot');
  };

  return (
    <div>
      <Banner />
      <Category />
      {/* <ChatbotShowcase onStartChat={handleStartChat} /> */}
      {/* <ExploreSection /> */}
      {/* <Products /> */}
    </div>
  )
}

export default Home
