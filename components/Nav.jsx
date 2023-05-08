"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

function Nav() {
  const isUserLoggedIn = true

  const [providers, setProvider] = useState(null) 
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders()
      setProvider(response)
    }
    setProvider()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt="Promptia Logo"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text '>Next-AI-Prompts</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
          {isUserLoggedIn ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'>
                Create Post
              </Link>

              <button
                type='button'
                onClick={signOut}
                className='outline_btn'
              >
                Sign Out
              </button>

              <Link href='/profile'>
                <img
                  src="/assets/images/logo.svg"
                  alt="profile"
                  width={37}
                  height={37}
                  className='rounded-full'
                />
              </Link>
            </div>
          ): (
            <>
              {providers && 
                Object.values(providers).map((provider) => (
                  <button
                  className='black_btn'
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
          {isUserLoggedIn ? (
            <div className='flex'>
              <img
                  src="/assets/images/logo.svg"
                  alt="profile"
                  width={37}
                  height={37}
                  className='rounded-full'
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />

                {toggleDropdown && (
                  <div className='dropdown'>
                    <Link
                      href='/profile'
                      className='dropdown_list'
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href='/create-prompt'
                      className='dropdown_list'
                      onClick={() => setToggleDropdown(false)}
                    >
                     Create Prompt
                    </Link>
                    <button
                      className='mt-5 w-full black_btn'
                      type='button'
                      onClick={() => {
                        setToggleDropdown(false)
                        signOut()
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
            </div>
          ) : (
            <>
              {providers && 
                Object.values(providers).map((provider) => (
                  <button
                  className='black_btn'
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav