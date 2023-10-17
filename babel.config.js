module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], //adicionar esse preset
    plugins: [ //adiconar o plugin -> precisou " instalar npm install --save-dev babel-plugin-module-resolver "
      [
        'module-resolver', 
        {
          root: ['./src'], //diz onde é a pasta raíz da aplicação
          alias: { //aqui vai o mapeamneto das rotas dos arquivos mapaeamento 
            '@assets': './src/assets', 
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@theme': './src/theme',
            '@utils': './src/utils',
          }
        }
      ]
    ]
  };
};
