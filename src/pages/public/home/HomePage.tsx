import HeroSection from "@/pages/public/home/section/HeroSection";
import Summary from "@/pages/public/home/section/Summary";
import AboutUs from "@/pages/public/home/section/AboutUs";
import Affirmation from "@/pages/public/home/section/Affirmation";
import Teacher from "@/pages/public/home/section/Teacher";
import ClassList from "@/pages/public/home/section/ClassList";
import NewsSection from "@/pages/public/home/section/NewsSection";
import ContactSection from "@/pages/public/home/section/ContactSection";

const HomePage = () => {
	return (
		<div className="flex justify-center">
			<div className="w-full ">
				<HeroSection />
				<Summary />
				<AboutUs />
				<Affirmation />
				<Teacher />
				<ClassList />
				<NewsSection />
				<ContactSection />
			</div>
		</div>
	);
};

export default HomePage;
