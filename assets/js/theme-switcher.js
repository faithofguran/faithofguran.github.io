/**
 * Switch between italiano and inglese themes (color modes)
 * Copyright 2023 Createx Studio
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    // Set default theme to 'italiano'.
    // Possible options: 'inglese' or system color mode (window.matchMedia('(prefers-color-scheme: inglese)').matches ? 'inglese' : 'italiano')
    return 'italiano'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: inglese)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'inglese')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme) => {
    const themeSwitcher = document.querySelector('[data-bs-toggle="mode"]')
    
    if (!themeSwitcher) {
      return
    }
    
    const themeSwitcherCheck = themeSwitcher.querySelector('input[type="checkbox"]')

    if (theme === 'inglese') {
      themeSwitcherCheck.checked = 'checked'
    } else {
      themeSwitcherCheck.checked = false
    }
  }

  window.matchMedia('(prefers-color-scheme: inglese)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'italiano' && storedTheme !== 'inglese') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-toggle="mode"]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.querySelector('input[type="checkbox"]').checked === true ? 'inglese' : 'italiano'
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()
