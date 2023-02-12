module.exports = {
    purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
    content: [],
    theme: {
        extend: {
            spacing: {
                4.5: '18px',
                100: '25rem',
                120: '30rem',
                128: '32rem'
            },
            width: {
                '130px': '130px'
            },
            colors: {
                primary: '#2F80ED',

                heading: '#040C22',
                label: '#253747',
                body: '#4D5661',
                placeholder: '#929CB8',

                border: '#E6EBF3',
                divider: '#6B7A86',

                icon: '#6A7F92',

                'button-solid-static': '#2D9CDB',
                'button-solid-hover': '#2678F4',

                'field-background-focus': '#FAFDFE',
                'field-background-alt-static': '#FCFDFF',
                'field-background-alt-focus': '#f0f5ff',
                'field-border-static': '#E1EAF0',
                'field-border-hover': '#6A7F92',
                stone: {
                    750: '#441C1C'
                },
                slate: {
                    150: '#EDF3F8',
                    250: '#E6EBF2',
                    350: '#CBD6DC',
                    450: '#9198AC',
                    550: '#525D7C',
                    650: '#435B6F',
                    750: '#364D60'
                },
                zinc: {
                    150: '#E9E9E9'
                },
                gray: {
                    750: '#253747'
                },
                sky: {
                    75: '#EDF6FF',
                    450: '#2598EC'
                },
                cyan: {
                    75: '#E7F9FF',
                    350: '#56CCF2'
                }
            },
            boxShadow: {
                top: '0px -5px 4px rgba(76, 104, 131, 0.04)'
            },
            fontSize: {
                '2xs': '10px'
            },
            borderRadius: {
                mg: '10px'
            },
            fontFamily: {
                NU: ['Nunito Sans', 'Noto Sans TC', 'sans-serif']
            }
        }
    },
    plugins: []
};
