module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "xxs": "360px",
      'xs': "375px",
      'xs1': "390px",
      'xs2': "410px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      "laptop": "1366px"
    },

    extend: {

      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },

      container: {
        screens: {
          lg: "1222px"
        }
      },

      colors: {
        topBarBG: "#f6f6f6",
        borderColor: "#e5e7eb",
        topBarTextColor: "#252525",
        topBarVerticalSeperator: "#e1e1e1",
        logobarElementBG: "#e5371b", //primary color
        sliderHeading: "#010101",
        sliderText: "#222222",
        mutedText: "#999999",
        sliderDescription: "#666666",
        timeBG: "#eeeeee",
        commonCarouselMutedText: "#bbbbbb",
        menuHover: "#831E0F",
        stickyHover: "#363636",
        filteringIcon: "#9a9a9a",
        ratingIcon: "#ff9600",
        orderTrack: "#333333",
      },

      fontFamily: {
        DMSans: ['DM Sans', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif']
      },

      fontSize: {
        tiny: "7.5px",
        tinymd: "9px",
        tinymd2: "10px",
        tinyxl: "10.5px",
        tiny2xl: "12.5px",
        sm1: "13px",
        sm2: "14.5px",
        3.25: ".8125rem"
      },

      borderRadius: {
        "2.5xl": "1.25rem",
        3.75: "0.9375rem",
        4.5: "1.125rem",
      },

      borderWidth: {
        1: "1px",
      },

      spacing: {
        1.25: "0.3125rem",
        1.75: "0.4375rem",
        2.75: "0.6875rem",
        3.25: "0.8125rem",
        4.5: "1.125rem",
        4.75: "1.1875rem",
        5.5: "1.375rem",
        5.75: "1.4375rem",
        6.25: "1.5625rem",
        6.5: "1.625rem",
        7.25: "1.8125rem",
        7.5: "1.875rem",
        7.75: "1.9375rem",
        9.25: "2.3125rem",
        9.75: "2.4375rem",
        10.75: "2.6875rem",
        12.5: "3.125rem",
        13: "3.125rem",
        14: "3.6rem",
        15: "3.8125rem",
        15.5: "3.875rem",
        17: "4.125rem",
        18: "4.5rem",
        22: "5.35rem",
        23: "5.8125rem",
        25: "6.25rem",
        25.25: "6.3125rem",
        29.5: "7.375rem",
        30: "7.5rem",
        32.75: "8.1875rem",
        38: "9.5rem",
        42: "10.5rem",
        46.5: "11.625rem",
        46: "11.5rem",
        50: "12.3rem",
        50.2: "12.5rem",
        50.5: "12.625rem",
        54: "13.5rem",
        59: "14.8125rem",
        67: "16.875rem",
        70: "17.5rem",
        74: "18.5rem",
        76: "19rem",
        78: "19.5rem",
        82.5: "20.625rem",
        83: "20.75rem",
        85.25: "21.3125rem",
        87.5: "21.875rem",
        90: "22.5rem",
        92.5: "23.125rem",
        95: "23.75rem",
        96: "24rem",
        106: "26.5rem",
        110: "27.5rem",
        114: "28.5rem",
        115.5: "28.875rem",
        117.5: "29.375rem",
        123: "30.75rem",
        125: "31.25rem",
        136: "34rem",
        140: "35rem",
        140.5: "35.125rem",
        290.5: "72.625rem",
        291: "72.75rem",
        "98/100": "98%",
        "1/8": "12.5%",
        "2/8": "25%",
        ".5/8": "6.25%"
      },


      transitionDuration: {
        2000: "2000ms"
      },

      transitionProperty: {
        'width': 'width'
      },

      scale: {
        101: "1.01",
        102: "1.02",
        103: "1.03",
        107: "1.07",
      },
      inset: {
        6.5: "1.625rem",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
