import React,{useState} from 'react'
import { IoIosArrowDown,IoIosArrowUp  } from "react-icons/io";

function PropertyDescription({ desc }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleDescription = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="bg-white px-4 py-6">
        <p className={` leading-10  capitalize text-sm sm:text-xl md:text-2xl  font-roboto text-slate-600 font-light tracking-wider ${isExpanded ? '' : 'line-clamp-4'}`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem reprehenderit minima est numquam quasi enim amet. Et harum perferendis eum, numquam non aut, molestias iste quos odit exercitationem similique tempora cum? Beatae earum odit illo officiis blanditiis consequuntur deleniti ratione tempore impedit, dolorum necessitatibus nulla quasi rem aperiam at dolores temporibus velit! Nostrum fugit aspernatur officiis aut facilis, necessitatibus sunt voluptate debitis molestiae distinctio error ratione repudiandae dolores beatae sequi eius sed numquam dolorem possimus odit delectus iste, fugiat quisquam! Aspernatur odio necessitatibus mollitia dolorum ea beatae dolores. Sapiente ipsa labore, accusantium pariatur dolorem quam laborum sunt, impedit consequuntur aliquid quod. Numquam tempora amet et! Amet omnis ullam facilis provident non et rem, minima error blanditiis ipsam repellendus recusandae tenetur a tempore quia harum tempora pariatur sed similique esse, vel, iusto possimus! Obcaecati animi sit blanditiis dolore. Officia nobis dicta, amet, tempore aperiam recusandae, illum iure culpa necessitatibus ut delectus tempora incidunt. Aperiam officia voluptate labore itaque natus reprehenderit sequi laudantium rem autem iste saepe eius quam dolorem molestiae illum, consectetur accusantium vitae maxime cumque impedit quia facilis! Error nemo ex dolorem tempore praesentium aliquam harum culpa, explicabo animi recusandae aliquid corporis ratione aperiam sit laborum, dicta eaque id obcaecati.
        </p>
        <button 
          onClick={toggleDescription} 
          className=" capitalize font-roboto  mt-10 border-t-2 border-slate-200 w-full text-red-600 text-2xl flex items-center justify-center gap-2 py-3">
          {isExpanded ? (<>show less <IoIosArrowUp size={'30px'} /> </>) : (<>  show more <IoIosArrowDown size={'30px'} /> </>)}
        </button>
      </div>
    );
  }

export default PropertyDescription