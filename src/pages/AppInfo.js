import React, { useState } from 'react'
import { ArrowRight, ExternalLink } from 'react-feather'

function AppInfo() {
    const [showInfo, setShownInfo] = useState(false); 


    const infoShown = () => {
        localStorage.setItem('shown-info', 'true');
        setShownInfo(true);
    }

    return (
        !showInfo ?
        <div className='mm-info'>
            <h1>Hi, There 👋</h1>

            <p>I built this app just to flex my muscles with React, hehe 🙃, so yeah it's just a demo app that basically sync lyrics to songs just like <a href="https://musixmatch.com" className='link link--dark' target='_blank'>Musixmatch <ExternalLink size={12} /></a>. <br /> <br /> I choose just a couple of my favorite Ed Sheeran songs, so yeah just sit back and enjoy. But here's a few things to note 👇 </p>

            <ul>
                <li><span className='icon'>🗞</span> I do not own copyrights to the songs or lyrics used</li>
                <li><span className='icon'>👨🏽‍💻</span> <span>You can find the source code to this on <a href='https://github.com/faarda/react-musixmatch' className='link link--dark' target='_blank'>Github <ExternalLink size={12} /></a></span></li>
                <li><span className='icon'>🤘🏽</span> <span>I might write an article about this in the future, but right now <i>I don tire</i></span></li>
            </ul>
            
            <button className='mm-btn mm-btn--round mt-1' onClick={infoShown}>Check it out <ArrowRight className='next' /></button>
        </div> :
        null
    )
}

export default AppInfo
