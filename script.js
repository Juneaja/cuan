// script.js - FINAL VERSION 100% WORKING
class VideoMoneyApp {
    constructor() {
        this.currentUser = {
            id: 1, username: 'user123', balance: 25500, totalEarned: 125000,
            videosWatched: 127, whatsapp: '081234567890'
        };
        this.videos = [
            {id:1,title:"Cara Cepat Kaya Internet 2024",thumbnail:"https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",url:"https://www.youtube.com/embed/dQw4w9WgXcQ",points:5000,duration:25,watched:false,views:1247},
            {id:2,title:"Rahasia Bisnis Online",thumbnail:"https://img.youtube.com/vi/jfKfPfyJRdk/mqdefault.jpg",url:"https://www.youtube.com/embed/jfKfPfyJRdk",points:7500,duration:35,watched:false,views:892},
            {id:3,title:"Trading Crypto Pemula",thumbnail:"https://img.youtube.com/vi/9gcnFkmwJTU/mqdefault.jpg",url:"https://www.youtube.com/embed/9gcnFkmwJTU",points:10000,duration:45,watched:true,views:1567},
            {id:4,title:"Uang 1 Juta/Hari",thumbnail:"https://img.youtube.com/vi/TF8k7QseFBE/mqdefault.jpg",url:"https://www.youtube.com/embed/TF8k7
