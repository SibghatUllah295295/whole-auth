import Image from 'next/image';
import Link from 'next/link';
import downArrow from '../../../public/assets/Vector.svg';
import sampleLogo from '../../../public/assets/logo.svg';
import profile from '../../../public/assets/profile-circle.svg';
import search from '../../../public/assets/search-normal.svg';
import styles from './navbar.module.css';
const Navbar = () =>{
return(
    <div className = {styles.mainDiv}>
        <div>
            <Image
            src = {sampleLogo}
            width={50}
            height={50}
            alt='Logo'
            />
        </div>
        <div className = {styles.innerDiv}>
            <ul className = {styles.list}>
                <Link href='/discover'><button>Discover</button></Link>
                <li>Sounds <Image src={downArrow} className = {styles.arrowImg} width={10} height={25} alt='downArrow'/></li>
                <li>Auction Beats</li>
            </ul>
            <div className = {styles.secondInnerDiv}>
                <Image src={profile} width={20} height={20} alt='profile'/>
                <Image src={search} width={20} height={20} alt='search'/>
                <Link href='/login'>Get Started</Link>
            </div>
        </div>
    </div>
)
}
export default Navbar;