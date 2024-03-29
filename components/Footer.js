export default function Footer() {
  return (
      <footer id="footer" className="bg-[#333533] rounded-xl text-white m-4 flex items-center">
          <div className="leading-3 w-full p-4 md:flex md:items-center justify-between items-center text-center md:mx-12">
              <div className='pb-2 md:pb-0'>
                  <span className="text-xs lg:text-sm sm:text-center">© 2023 Kualify. Todos los derechos reservados.</span>
              </div>
              <ul className="flex flex-wrap justify-center items-center my-1 text-xs lg:text-sm font-medium px-8 space-x-2 md:space-x-4">
                  <li>
                      <a href="mailto:kualify.help@gmail.com" className="text-center">kualify.help@gmail.com</a>
                  </li>
                  <li>
                      <p className="text-center text-xs lg:text-sm font-medium ">+34 692 17 72 97</p>
                  </li>
              </ul>
          </div>
      </footer>
  )
}