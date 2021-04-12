import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './home.scss'
import Image from '../../icons/gorilla.svg';
import Arrow from '../../icons/arrow_10.svg';

const Home = () => {

  const user = useSelector(state => state.session?.user)

  if (user) return <Redirect to='/chatRoom/1' />


  return (
    <>
      <Arrow className='arrow'/>
      <div className='click'>Click the monkey!</div>
      <div className='yourPlace'>
        <Image className='image imageOne'/>
        <Image className='image imageTwo'/>
        <Image className='image imageThree'/>
        <Image className='image imageFour'/>
        <Image className='image imageFive'/>
        <Image className='image imageSix'/>
        <Image className='image imageSeven'/>
        <Image className='image imageEight'/>
        <Image className='image imageNine'/>
        <Image className='image imageTen'/>
        <div className='yourText'>
          <h1>Your place to talk</h1>
          <h3>Whether you're part of a school club, gaming group,
             worldwide art community, or just a handful of friends that want to spend some time together, Shrewdness makes it easy to talk every day and hang out more often.</h3>
        </div>
      </div>
      <div className='plentyBlock'>
        <div className='plentyText'>
          <h1>A place with plenty of room to talk</h1>
          <h3>Shrewdness groups are organized into topic-based
            channels where you can collaborate, share, and just 
            talk about your day without clogging up a group chat.</h3>
        </div>
      </div>
      <div className='journeyBlock'>
        <div className='journeyText'>
          <h1>Ready to start your journey?</h1>
          <h3>What are you waiting for? Start using Shrewdness today.</h3>
        </div>
      </div>
    </>
  )
}

export default Home