import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FinancialPlanningImg from '/FinancialPlanning.png';
import MutualFundsImg from '/MutualFunds.png';
import TaxPlanning from '/TaxPlanning.png';
import PortfolioManagementImg from '/PortfolioManagement.png';
import InsurancePlanningImg from '/InsurancePlanning.png';
import RetirementSolutionImg from '/RetirementSolution.png';
import AboutUsImg from '/aboutus.png';
import LogoIcon from '/Logo.svg';
import FinanceCoinIcon from '/FinanceCoin.svg';

function LandingPage() {
  return (
    <div>
      <header className="fixed top-0 z-10 w-full bg-gradient-to-r from-[#4690CD] to-[#6EB7E4] text-white antialiased text-[20px] px-32">
        <nav className="">
          <ul className="flex py-3">
            <li className="">
              <Link className="flex" to="/">
                <img className="h-8 w-8 my-auto" src={LogoIcon} alt="" />
                <div className="text-[25px] ml-1">Wealthwise</div>
              </Link>
            </li>
            <li className="ml-auto my-auto">
              <Link
                onClick={() => window.scrollTo(0, 0)}
                className="ml-4"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="my-auto">
              <a className="ml-7" href="#AboutUs">
                About Us
              </a>
            </li>
            <li className="my-auto">
              <a className="ml-7" href="#OurServices">
                Services
              </a>
            </li>
            <li className="my-auto">
              <a className="ml-7" href="#Contact Us">
                Contact Us
              </a>
            </li>
            <li className="my-auto">
              <Link
                className="ml-7 rounded-full px-8 py-1.5 bg-[#2DDA9B] text-white hover:bg-[#2dda9bcf]"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="my-auto">
              <Link
                className="ml-3 rounded-full px-5 py-1.5 border-[2px] border-white"
                to="/signup"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <div className="grid grid-cols-[auto_auto] bg-gradient-to-r from-[#4690CD] to-[#6EB7E4] text-white antialiased">
          <div className="col-span-">
            <h1 className="text-[84px] ml-44 translate-y-[50px] font-bold">
              <div className="translate-y-[170px]">Achieve</div> <br />{' '}
              Financial Freedom
            </h1>
            <div className="ml-44 text-[25px] translate-y-[70px]">
              We help you achieve your financial goals by <br />{' '}
              <div className="-translate-y-1">disciplined investments</div>
            </div>
            <Link to="/aboutus">
              <div className="mb-[220px] inline-block ml-44 mt-[120px] rounded-full px-6 py-2 text-[20px] text-center bg-[#2DDA9B] hover:bg-[#2dda9bcf]">
                Learn More
              </div>
            </a>
          </div>
          <div className="my-auto h-[550px] w-[550px]">
            <img className="" src={FinanceCoinIcon} alt="" />
          </div>
        </div>
        <h2
          id="AboutUs"
          className="text-center font-bold text-[50px] pt-28 -mt-14 mb-11"
        >
          About Us
        </h2>
        <h3 className="text-center font-medium text-[26px] mb-5">
          Mindful Planning of Monetary Spending and Saving
        </h3>
        <p className="text-center text-lg">
          WealthWise is deeply committed to guiding individuals in managing
          their finances <br /> and achieving their financial goals. With our
          intuitive platform, users can <br /> effortlessly track expenses,
          monitor investments, and plan <br /> for the future with confidence
        </p>
        <div className="grid grid-rows-1 grid-cols-2">
          <div className="mt-14 mb-14 ml-[300px] bg-slate-50 drop-shadow-md h-[500px] w-[700px]">
            <div className="px-20 py-20">
              <h3 className="text-[35px] font-bold mb-5">Our Mission</h3>
              <h4 className="font-medium text-[26px] mb-5">
                Empowering Financial Futures
              </h4>
              <p className="text-lg">
                At WealthWise, our mission is to empower individuals <br /> to
                take control of their financial futures. We believe <br />{' '}
                everyone deserves access to quality financial <br /> advice,
                regardless of their income or background. <br /> Through our
                platform, we provide the knowledge <br /> and tools needed for
                success. Join us in achieving <br /> financial empowerment for
                all.
              </p>
            </div>
          </div>
          <div className="drop-shadow-2xl -translate-x-[45px] mt-[99px] ">
            <img className="rounded-xl" src={AboutUsImg} alt="" />
          </div>
        </div>
        <div className="grid grid-cols-[auto_420px_auto] justify-items-center bg-gradient-to-r from-[#4690CD] to-[#6EB7E4] text-white antialiased">
          <h2
            id="OurServices"
            className="text-center font-bold text-[50px] col-span-3 pt-28 -mt-14 my-14"
          >
            Our Services
          </h2>
          <div className="drop-shadow-xl ml-[100px] mb-11 rounded-3xl h-[325px] w-[410px] bg-white text-black">
            <img
              className="h-20 w-20 mx-auto mt-10"
              src={FinancialPlanningImg}
              alt=""
            />
            <h3 className=" text-[#6EB7E4] font-medium text-center mt-3 text-[26px]">
              Financial Planning
            </h3>
            <p className="mt-6 text-lg text-center">
              Comprehensive financial plan <br /> to make sure you achieve your{' '}
              <br /> goals in a timely manner
            </p>
          </div>
          <div className="drop-shadow-xl rounded-3xl h-[325px] w-[410px] bg-white text-black">
            <img
              className="h-20 w-16 mx-auto mt-10"
              src={MutualFundsImg}
              alt=""
            />
            <h3 className="text-[#6EB7E4] font-medium text-center mt-3 text-[26px]">
              Mutual Funds
            </h3>
            <p className="mt-6 text-lg text-center">
              Multipy your money with the <br /> power of compounding with{' '}
              <br /> Mutual Funds
            </p>
          </div>
          <div className="drop-shadow-xl mr-[100px] rounded-3xl h-[325px] w-[410px] bg-white text-black">
            <img className="h-20 w-16 mx-auto mt-10" src={TaxPlanning} alt="" />
            <h3 className="text-[#6EB7E4] font-medium text-center mt-3 text-[26px]">
              Tax Planning
            </h3>
            <p className="mt-6 text-lg text-center">
              Efficient tax strategy solution <br /> that helps you successfully
              and <br />
              legally reduce your tax liability
            </p>
          </div>
          <div className="drop-shadow-xl ml-[100px] rounded-3xl h-[325px] w-[410px] bg-white text-black">
            <img
              className="h-20 w-20 mx-auto mt-10"
              src={PortfolioManagementImg}
              alt=""
            />
            <h3 className="text-[#6EB7E4] font-medium text-center mt-3 text-[26px]">
              Portfolio Management
            </h3>
            <p className="mt-6 text-lg text-center">
              Customized smart investment <br /> options that cater the need for{' '}
              <br /> wealth creation & preservation
            </p>
          </div>
          <div className="drop-shadow-xl mb-14 rounded-3xl h-[325px] w-[410px] bg-white text-black">
            <img
              className="h-20 w-16 mx-auto mt-10"
              src={InsurancePlanningImg}
              alt=""
            />
            <h3 className="text-[#6EB7E4] font-medium text-center mt-3 text-[26px]">
              Insurance Planning
            </h3>
            <p className="mt-6 text-lg text-center">
              Best insurance plans to protect <br /> you and your family against{' '}
              <br /> any uncertainities
            </p>
          </div>
          <div className="drop-shadow-xl rounded-3xl mr-[100px] h-[325px] w-[410px] bg-white text-black">
            <img
              className="h-20 w-20 mx-auto mt-10"
              src={RetirementSolutionImg}
              alt=""
            />
            <h3 className="text-[#6EB7E4] font-medium text-center mt-3 text-[26px]">
              Retirement Solution
            </h3>
            <p className="mt-6 text-lg text-center">
              Customised retirement plan <br /> linked with your future goals{' '}
              <br /> for a comfortable retired life
            </p>
          </div>
        </div>
        <div className="mb-11 container mx-auto px-4 py-8">
          <h2
            className="text-center font-bold text-[50px] pt-28 -mt-14 mb-11"
            id="Contact Us"
          >
            Contact Us
          </h2>
          <div className="bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 px-20 py-20 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Our Information</h2>
              <p className="text-lg mb-4">
                <strong>Address:</strong> R6JM+P5C, Rue du Lac Biwa, Tunis
              </p>
              <p className="text-lg mb-4">
                <strong>Email:</strong> Walthwise@gmail.com
              </p>
              <p className="text-lg mb-4">
                <strong>Phone:</strong> +21654353910
              </p>
              <p className="text-lg mb-4">
                <strong>Working Hours:</strong> Monday - Friday: 9:00 AM - 5:00
                PM
              </p>
              <p className="text-lg mb-4">
                Feel free to reach out to us via email or phone during our
                working hours. We're here to assist you with any questions or
                concerns you may have.
              </p>
            </div>
            <div className="bg-slate-50 px-20 py-20 ">
              <h2 className="text-2xl font-bold mb-4 ">Get in Touch</h2>
              <p className="text-lg mb-4">
                Have a question or feedback? We'd love to hear from you! Send us
                a message using the form below, and we'll get back to you as
                soon as possible.
              </p>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]"
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]"
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]"
                    id="message"
                    name="message"
                    rows="4"
                  ></textarea>
                </div>
                <button className="w-full bg-[#2DDA9B] hover:bg-[#2dda9bcf] text-white py-2 px-6 rounded-md">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
