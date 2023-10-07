import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const Dropdown = ({ options, element }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="dropdown-button" >
        { element }
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute menu-items-dropdown z-10 mt-2 w-56 origin-top-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {
                options.map((option, index) => (
                    <button 
                      key={index}
                      type='button'
                      onClick={option.actionButton}
                    >
                        { option.titleButton }
                    </button>
                ))
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown