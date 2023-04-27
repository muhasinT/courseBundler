import { Stack, VStack, Heading, Text, Button, Image, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import './home.scss'
import img1 from '../../assets/images/img_01.jpg'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'
import introVideo from '../../assets/videos/intro.mp4'
import {Link,} from 'react-router-dom'

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']} 
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems='center'
          spacing={['16', '56']}
        >
          <VStack width={'full'} alignItems={['center', 'flex-end']} spacing="8">
            <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} />
            <Text fontSize={'2xl'} fontFamily="cursive" textAlign={["center","left"]} children="Find Valueable Content At Reasonable Price " />
            <Link to="/courses">
              <Button className='button' size={'lg'} >
                Explore Now
              </Button>
            </Link>
          </VStack>

          <Image className='vector_img' boxSize={"md"} src={img1} />
        </Stack>
      </div>

      <Box className='brand_box'>
        <Heading className='brand_heading'
          textAlign={'center'}
          fontFamily='body'
          children="OUR BRANDS"
        />
        <HStack className='brands_icons'>
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          //  autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        >

        </video>
      </div>
    </section>
  )
}

export default Home