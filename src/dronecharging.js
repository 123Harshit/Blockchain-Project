import web3 from './web3';

const address = '0x5900722aedA5201165D9c7b5F9937730FBe93c73';

const abi = 
[
    {
        "constant":true,
        "inputs":[],
        "name":"getdrones",
        "outputs":[{"name":"","type":"uint256"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[{"name":"nm","type":"string"},
        {"name":"cl","type":"uint256"},
        {"name":"mil","type":"uint256"},
        {"name":"p","type":"uint256"},
        {"name":"x0","type":"uint256"},
        {"name":"y0","type":"uint256"}],
        "name":"drone_enter",
        "outputs":[],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"},
    {
        "constant":true,"inputs":[],
        "name":"budget_reached_coutn",
        "outputs":[{"name":"","type":"uint256"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"},
    {
        "constant":true,
        "inputs":[],"name":"winner_drone","outputs":[{"name":"name","type":"string"},{"name":"charge_level","type":"uint256"},{"name":"mileage","type":"uint256"},{"name":"price_sent","type":"uint256"},{"name":"price_offered","type":"uint256"},{"name":"addr","type":"address"},{"name":"priority","type":"uint256"},{"name":"poss_dist","type":"uint256"},{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"update_drone_price","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"pickwinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stations","outputs":[{"name":"name","type":"string"},{"name":"energy_offered","type":"uint256"},{"name":"addr","type":"address"},{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"drones","outputs":[{"name":"name","type":"string"},{"name":"charge_level","type":"uint256"},{"name":"mileage","type":"uint256"},{"name":"price_sent","type":"uint256"},{"name":"price_offered","type":"uint256"},{"name":"addr","type":"address"},{"name":"priority","type":"uint256"},{"name":"poss_dist","type":"uint256"},{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getstations","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxpridrone","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxpristation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"cs_priority","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nam","type":"string"},{"name":"p","type":"uint256"},{"name":"x0","type":"uint256"},{"name":"y0","type":"uint256"}],"name":"station_enter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"p","type":"uint256"}],"name":"update_station_energyoffered","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"calc_dist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

export default new web3.eth.Contract(abi, address);