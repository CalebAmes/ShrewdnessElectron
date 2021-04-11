import io from 'socket.io-client';

const socket = io('https://shrewdness.herokuapp.com/');

export default socket