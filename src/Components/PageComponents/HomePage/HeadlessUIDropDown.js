import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { CgSelect } from "react-icons/cg"
import { AiOutlineCheck } from "react-icons/ai"

// const value = [
//     { name: 'English' },
//     { name: 'Spanish' },
//     { name: 'Bangla' },
//     { name: 'Arabic' },
// ]

export default function HeadlessUIDropDown(props) {
    const { value, setValue } = props
    const [selected, setSelected] = useState(value[0])

    const handleOnChange = value => {
        setSelected(value)
        setValue(value.name.toLowerCase())
    }

    return (
        <div className="w-24">
            <Listbox value={selected} onChange={value => handleOnChange(value)}>
                <div className="relative">
                    <Listbox.Button className="relative w-full py-2 pr-10 text-left bg-white rounded-lg cursor-pointer focus:outline-none sm:text-sm font-DMSans bg-topBarBG">
                        <span className="block truncate">{selected.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                            <CgSelect
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20 font-DMSans">
                            {value.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-pointer select-none relative py-2 pl-3 pr-4 hover:bg-logobarElementBG hover:text-white`
                                    }
                                    value={person}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`${selected ? 'font-medium' : 'font-normal'
                                                    } block truncate`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                        }
                                absolute inset-y-0 right-0 flex items-center pr-2`}
                                                >
                                                    <AiOutlineCheck className="w-5 h-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
