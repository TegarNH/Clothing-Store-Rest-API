# Clothing Store Rest API
Rest API used for clothing stores that can provide transaction reports, customer data and clothing data. This API has initial data that can be tested directly using [Postman](https://www.postman.com/) by entering the endpoint [clothing-store-rest-api-production.up.railway.app/api](clothing-store-rest-api-production.up.railway.app/api).

## Features
- Display clothing data with the highest and lowest prices.
- Display customer data for the first time to register (oldest customer) and the last customer to register (newest customer) by branch.
- Display the 10 most purchased clothing data in 1 month at each branch (based on quantity).
- Display 10 customer data that spend the most in 1 month at each branch (based on accumulated total spending).
- Display the total sales data for each branch in 1 year.
- Display 5 clothing data that experienced the highest increase in sales this month compared to the previous month. By comparing the quantity sold this month with the quantity sold the previous month.



## Table of Contents
- [Getting Started](#getting-started)
- [Local Usage](#local-usage)
- [Production Usage](#production-usage)
- [API Documentation](#api-documentation)
- [Built with](#built-with)
- [Author](#author)
- [License](#license)



## Getting Started
To get started running the project locally, please follow the steps below.
1. Make sure you have installed [Node.js](https://nodejs.org/en/download/), [PostgreSQL](https://www.postgresql.org/download/) and [Postman](https://www.postman.com/) on your local machine. 

2. Clone the repository
```bash
git clone https://github.com/TegarNH/Clothing-Store-Rest-API.git
```

3. Install dependencies and fetch data to your local machine.
```bash
cd Clothing-Store-Rest-API
npm install
```

4. Adjust `username`, `password`, `host`, and `port` with your PostgreSQL database configuration in file `./config/database.json`



## Local Usage
1. Run the project
```bash
npm run local
```

2. Open Postman, create a new request, paste [http://localhost:3000/api](http://localhost:3000/api) in the request URL, and provide the path according to the one in the [API Documentation](#api-documentation).

3. Click the `Send` button to send the request to the server



## Production Usage
1. Open Postman, create a new request, paste [clothing-store-rest-api-production.up.railway.app/api](clothing-store-rest-api-production.up.railway.app/api) in the request URL, and provide the path according to the one in the [API Documentation](#api-documentation).

2. Click the `Send` button to send the request to the server



## API Documentation
Visit the following site to view the [API documentation](https://documenter.getpostman.com/view/24721460/2s8ZDR75dH)



## Built with
| [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)      | [PostgreSQL](https://www.postgresql.org/)      | [Postman](https://www.postman.com/)      | [NodeJS](https://nodejs.org/en/)      | [Express](https://expressjs.com/)      | [Sequelize](https://sequelize.org/)      |  [Railway](https://railway.app/)      |
|-------------|-------------|-------------|-------------|-------------|-------------|-------------|
| <img src="https://www.computerhope.com/jargon/j/javascript.png" width="100"> | <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" width="100"> | <img src="https://miro.medium.com/max/640/1*4b2A9LnOXidRaqXXU8CZMA.webp" width="100"> | <img src="https://user-images.githubusercontent.com/60727435/174690843-9fdfac60-e4c0-4ae8-a565-8212bd720ace.png" width="100"> | <img src="https://img2.pngdownload.id/20180614/aut/kisspng-node-js-express-js-javascript-solution-stack-web-a-5b22b9d544a3c5.7437956215290024532812.jpg" width="100"> | <img src="https://sequelize.org/img/logo.svg" width="100"> |  <img src="https://railway.app/brand/logo-light.png" width="100"> |



## Author
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/TegarNH"><img src="https://avatars.githubusercontent.com/u/55114771?v=4" width="100px;" alt=""/></a><br />
      <a href="https://www.linkedin.com/in/tegarnaufalhanip/"><p style="font-size:10px">Tegar Naufal Hanip</p>
    </td>
  </tr>
</table>



## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [`LICENSE`](LICENSE) file for details.
