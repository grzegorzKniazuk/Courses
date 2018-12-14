const path = require('path');
const UglifiJSPPlugin = require('uglifyjs-webpack-plugin'); // plugin do minifikacji
const ExtractTextPlugin = require('extract-text-plugin'); // zapis danych do plikow na podstawie zaleznosci dostarczanych przez loadery

module.exports = { // config
    entry: './data.js', // wejscie
    output: { // wyjscie
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true, // nasluchiwanie na zmiany w plikach
    detool: 'source-map', // wskazywanie na zrodlowa linie bledu w konsoli developerskiej przegladarki
    module: { // loaders settings
        rules: [{
                test: /\.csv$/, // rozszerzenie ktore dotyczy tej reguly
                use: [
                    {
                        loader: 'to-string-loader',
                    },
                    { // paczki do uzycia
                        loader: 'csv-loader',
                        options: {
                            header: true, // pierwsza linia pliku to nazwy kolumn
                        }
                    }
                ],
            exclude: /node_modules/,
            }, {
                test: /\.js$/, // pliki js
                use: {
                    loader: 'babel-loader', // uzycie babela
                    options: {
                        presets: [ 'es2015' ],
                        plugins: [
                            'babel-plugin-transform-class-properties',
                        ],
                    }
                },
            }, { // dolaczanie css
                test: /\.css$/,
                use: [ 'style-loader', {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true, // ułatwia debugowanie w devtools
                        minimize: true, // zmniejsza obietosc pliku css
                    },
                }, {
                    loader: 'postcss-loader', // instalacja postcss w celu uzycia autoprefixera
                    options: {
                        plugins: (loader) => {
                            new require('autoprefixer')()
                        }
                    }
                }],
            }, { // obsluga plikow scss
                test: /\.scss/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        }
        ],
    },
    plugins: [
        new UglifiJSPPlugin(),
        new ExtractTextPlugin(),
    ],
};