import React, { useState ,useRef} from 'react'
import {View,Text, Image,ScrollView,StyleSheet,Dimensions,Animated} from "react-native"
import faker from "faker" ;
import {FontAwesome,Ionicons,EvilIcons,Feather} from "@expo/vector-icons"
import {LongPressGestureHandler,TapGestureHandler,State, PanGestureHandler} from "react-native-gesture-handler"
import { Audio } from 'expo-av';
const {width,height} = Dimensions.get('screen')
const images = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
   'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
 
];

const imoji = [
 { 
   image: require('./assets/images/like.png'),
   text:'Like',
   color:"#1E90FF"
},
{
  image: require('./assets/images/love.png'),
  text:'Love',
  color:'red',
},
{ 
  image:   require('./assets/images/laughing.png'),
  text:'Hhh',
  color:"yellow"
},
{
 image: require('./assets/images/surprised.png'),
 text:'Wow',
 color:'yellow',
},
{ 
  image:require('./assets/images/crying.png'),
  text:'Sad',
  color:"yellow"
},
{
 image: require('./assets/images/angry.png'),
 text:'Angry',
 color:'red',
}
]



faker.seed(10);
const DATA = [...Array(2).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        avatar: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        image:images[Math.floor(Math.random() * (0 - 2) + 2)],
        visible:false,
        react:null
    };
});

const LEFT_ALIGN=16;
const IMOJI_WIDTH = width*90/100/6


export default function index() {
  const [data,setData] = useState(DATA)
  
  const touchX = useRef(new Animated.Value(LEFT_ALIGN)).current ;
  const likeX  = useRef(new Animated.Value(24)).current ;
  const loveX  = useRef(new Animated.Value(32)).current ;
  const laughX  = useRef(new Animated.Value(40)).current ;
  const wowX  = useRef(new Animated.Value(48)).current ;
  const cryX  = useRef(new Animated.Value(56)).current ;
  const angryX  = useRef(new Animated.Value(64)).current ;


  async function playSoundBoxUp() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/audio/box_up.mp3')
    );
    await sound.playAsync(); 
  }
  
  async function playSoundBoxDown() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/audio/box_down.mp3')
    );
    await sound.playAsync(); 
  }

  async function playSoundHitLike() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/audio/short_click.mp3')
    );
    await sound.playAsync(); 
  }


  

  const getRightImoji = (react)=>{
    for (let index = 0; index < imoji.length; index++) {
      if(react==imoji[index].text){
        return (
          <>
           <Image source={imoji[index].image} style={{width:24,height:24}}/>
           <Text style={{color:imoji[index].color,marginLeft:8}}>{imoji[index].text}</Text>
          </>
        )
      }
      
    }
  }
 

  const onHandlerStateChange = (event,key) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Animated.parallel([
       
        Animated.timing(likeX, {
          toValue: 0,
          duration:240,
          useNativeDriver:true
        }),
        Animated.timing(loveX, {
          toValue: 0,
          duration:320,
          useNativeDriver:true
        }),
        Animated.timing(laughX, {
          toValue: 0,
          duration:400,
          useNativeDriver:true
        }),
        Animated.timing(wowX, {
          toValue: 0,
          duration:480,
          useNativeDriver:true
          
        }),
        Animated.timing(cryX, {
          toValue: 0,
          duration:560,
          useNativeDriver:true
        }),
        Animated.timing(angryX, {
          toValue: 0,
          duration:640,
          useNativeDriver:true

        })
      ]).start()
      playSoundBoxUp()
      setData(
        data.map((item) => 
            item.key === key
            ? {...item, visible :true} 
            : item 
    ))
    }
  };
  const onSingleTap = (event,key) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setData(
        data.map((item) => 
        item.key === key
        ?
          {...item, react :item.react==null?'Like':null} 
          :
          item
        
      ))
      playSoundHitLike()
    }
  };

  const onPanHandlerStateChange = ({nativeEvent},key) => {
    console.log(nativeEvent.state,State)
    if (nativeEvent.state === State.BEGAN) {
      touchX.setValue(nativeEvent.x);
    }
    if (nativeEvent.state === State.CANCELLED) {
      touchX.setValue(0);
     
      Animated.parallel([
       
        Animated.timing(likeX, {
          toValue: 24,
          duration:240,
          useNativeDriver:true
        }),
        Animated.timing(loveX, {
          toValue: 32,
          duration:320,
          useNativeDriver:true
        }),
        Animated.timing(laughX, {
          toValue: 40,
          duration:400,
          useNativeDriver:true
        }),
        Animated.timing(wowX, {
          toValue: 48,
          duration:480,
          useNativeDriver:true
          
        }),
        Animated.timing(cryX, {
          toValue: 56,
          duration:560,
          useNativeDriver:true
        }),
        Animated.timing(angryX, {
          toValue: 64,
          duration:640,
          useNativeDriver:true

        })
      ]).start(({finished})=>{
        if(finished){
           setData(
              data.map((item) => 
                  item.key === key
                  ?
                  {...item, visible :false} 
                  :
                  item
             ))
         }

      })
      playSoundBoxDown()

     
      
    }
   
     
    if (nativeEvent.state === State.END) {

     
      touchX.setValue(0);
      Animated.parallel([
       
        Animated.timing(likeX, {
          toValue: 24,
          duration:240,
          useNativeDriver:true
        }),
        Animated.timing(loveX, {
          toValue: 32,
          duration:320,
          useNativeDriver:true
        }),
        Animated.timing(laughX, {
          toValue: 40,
          duration:400,
          useNativeDriver:true
        }),
        Animated.timing(wowX, {
          toValue: 48,
          duration:480,
          useNativeDriver:true
          
        }),
        Animated.timing(cryX, {
          toValue: 56,
          duration:560,
          useNativeDriver:true
        }),
        Animated.timing(angryX, {
          toValue: 64,
          duration:640,
          useNativeDriver:true

        })
      ]).start(({finished})=>{
        if(finished){
         
          switch (true) {
            case nativeEvent.x<IMOJI_WIDTH:
              setData(
                data.map((item) => 
                    item.key === key
                    ?
                     {...item, react :'Like',visible :false} 
                     :
                     item
                
              ))
              playSoundHitLike()
              break;
            case IMOJI_WIDTH<nativeEvent.x &&nativeEvent.x<IMOJI_WIDTH*2:
              setData(
                data.map((item) => 
                  item.key === key
                  ?
                  {...item, react :'Love',visible :false} 
                  :
                  item
                

              ))
              playSoundHitLike()
               break;
            case IMOJI_WIDTH*2<nativeEvent.x && nativeEvent.x<IMOJI_WIDTH*3:
              setData(
                data.map((item) => 
                  item.key === key
                  ?
                  {...item, react :'Hhh',visible :false} 
                  :
                  item
                
              ))
              playSoundHitLike()
               break;
            case IMOJI_WIDTH*3<nativeEvent.x  &&nativeEvent.x<IMOJI_WIDTH*4:
              setData(
                data.map((item) => 
                  item.key === key
                   ?
                   {...item, react :'Wow',visible :false}
                   :
                   item 
                
              ))
              playSoundHitLike()
               break;
            case IMOJI_WIDTH*4<nativeEvent.x  && nativeEvent.x<IMOJI_WIDTH*5:
              setData(
                data.map((item) => 
                  item.key === key
                  ?
                  {...item, react :'Sad',visible :false} 
                  :
                  item
                
              ))
              playSoundHitLike()
               break;
            case IMOJI_WIDTH*5<nativeEvent.x  :
              setData(
                data.map((item) => 
                  item.key === key
                  ?
                  {...item, react :'Angry',visible :false} 
                  :
                  item
                
              ))
                playSoundHitLike()
               break;
            default:
              break;
          }
        }
         
      })
    
     

    }
  };

  return (
   <ScrollView 
     onScroll={()=>{
       touchX.setValue(0)
     
      setData(
        data.map((item) =>{
          return  {...item, visible :false}
        }   
        
        
          
         
        
      ))
     }}
     contentContainerStyle={{
       backgroundColor:'black',
       paddingTop:32
      
      }}
    
   >
     {
       data.map((item,index)=>{
         return (
           <View key={index} style={styles.post}>
                <View style={styles.postHeader}>
                    <View style={styles.userHeader}>
                      <Image source={{uri:item.avatar}}  style={styles.avatar} />
                      <View>
                        <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>{item.name}</Text>
                        <Text style={{color:'white'}}>3m</Text>
                      </View>
                    </View>
                    <View>
                      <Feather name="more-horizontal" size={28} color="#B0B0B0" />
                    </View>
                </View>
                <Image source={{uri:item.image}} style={{width:width,height:350}}/>
                <View style={styles.reactionView}>
                  <LongPressGestureHandler
                    onHandlerStateChange={(ev)=>{onHandlerStateChange(ev,item.key)}}
                    minDurationMs={400}>
                        <TapGestureHandler
                          onHandlerStateChange={(ev)=>{onSingleTap(ev,item.key)}}
                         
                          >
                        <View style={styles.reactButton}>
                            {
                              item.react==null
                              ?
                              <>
                                <FontAwesome name="thumbs-o-up" size={24} color={item.react?'#1E90FF':"#B0B0B0"} />
                                <Text style={{color:'#B0B0B0',marginLeft:8}}>Like</Text>
                              </>
                              :
                              getRightImoji(item.react)
                            }
                            
                        </View >
                        </TapGestureHandler>
                    </LongPressGestureHandler>
                    <View style={styles.reactButton}>
                        <Ionicons name="chatbox-outline" size={24} color="#B0B0B0" />
                        <Text style={{color:'#B0B0B0',marginLeft:8}}>Comment</Text>
                    </View>
                    <View style={styles.reactButton}>
                         <FontAwesome name="share" size={24} color="#B0B0B0" />
                        <Text style={{color:'#B0B0B0',marginLeft:8}}>Share</Text>
                    </View>
                </View>

                <PanGestureHandler
                   onGestureEvent ={ Animated.event([{ nativeEvent: { x: touchX } }], {
                    useNativeDriver: true,
                  })}
                  onHandlerStateChange={(ev)=>{onPanHandlerStateChange(ev,item.key)}}
                  shouldCancelWhenOutside


                >
                  <Animated.View style={[styles.imojiViewWraper,{
                    opacity:
                      item.visible
                      ?
                      angryX.interpolate({
                        inputRange:[0,64],
                        outputRange:[1,0]
                        })
                      :
                      0
                  }]}>
                      <Animated.View style={[styles.imojiView]} >
                            <Animated.View  style={{
                              flex:1,
                              justifyContent:'center',
                              position:'relative',
                              alignItems:'center',
                              opacity:likeX.interpolate({inputRange:[0,24],outputRange:[1,0]}),
                              transform:[
                                {
                                  translateY:likeX
                                },
                                {
                                  scale:likeX.interpolate({inputRange:[0,24],outputRange:[1,0]})
                                }
                            ]
                              }}>
                                <Animated.View style={[styles.tooltip,{
                                   opacity:touchX.interpolate({
                                    inputRange:[0,IMOJI_WIDTH,IMOJI_WIDTH],
                                    outputRange:[0,1,0]
                                   })
                                }]}>
                                  <Text style={{fontSize:11,color:"white",textAlign:"center",fontWeight:'bold'}}>Like</Text>
                                </Animated.View>
                                <Animated.Image 
                                    source={require('./assets/images/like.png')} 
                                    style={{
                                      width:36,
                                      height:36,
                                      transform:[
                                        {
                                          scale:touchX.interpolate({
                                          inputRange:[0,IMOJI_WIDTH,IMOJI_WIDTH],
                                          outputRange:[1,2.4,1]
                                          })
                                      }
                                      ]
                                    }}/>
                            </Animated.View>
                            <Animated.View  style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                opacity:loveX.interpolate({inputRange:[0,32],outputRange:[1,0]}),
                                transform:[
                                  {
                                  translateY:loveX
                                  },
                                  {
                                    scale:loveX.interpolate({inputRange:[0,32],outputRange:[1,0]})
                                  }
                              ]
                                }}>
                                   <Animated.View style={[styles.tooltip,{
                                   opacity:touchX.interpolate({
                                    inputRange:[LEFT_ALIGN,IMOJI_WIDTH,IMOJI_WIDTH*2,IMOJI_WIDTH*2],
                                    outputRange:[0,0,1,0]
                                   })
                                }]}>
                                  <Text style={{fontSize:11,color:"white",textAlign:"center",fontWeight:'bold'}}>Love</Text>
                                </Animated.View>
                                <Animated.Image 
                                    source={ require('./assets/images/love.png')} 
                                    style={{
                                      width:36,
                                      height:36,
                                      transform:[
                                        {scale:touchX.interpolate({
                                          inputRange:[LEFT_ALIGN,IMOJI_WIDTH,IMOJI_WIDTH*2,IMOJI_WIDTH*2],
                                          outputRange:[1,1,2.4,1]
                                        })}
                                      ]
                                    }}/>
                            </Animated.View>
                          
                            <Animated.View  style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                opacity:laughX.interpolate({inputRange:[0,40],outputRange:[1,0]}),
                                transform:[
                                  {
                                  translateY:laughX
                                  },
                                  {
                                    scale:laughX.interpolate({inputRange:[0,40],outputRange:[1,0]})
                                  }
                              ]
                                }}>
                                   <Animated.View style={[styles.tooltip,{
                                   opacity:touchX.interpolate({
                                    inputRange:[LEFT_ALIGN,IMOJI_WIDTH*2,IMOJI_WIDTH*3,IMOJI_WIDTH*3],
                                    outputRange:[0,0,1,0]
                                   })
                                }]}>
                                  <Text style={{fontSize:11,color:"white",textAlign:"center",fontWeight:'bold'}}>Hhh</Text>
                                </Animated.View>
                                <Animated.Image 
                                    source={ require('./assets/images/laughing.png')} 
                                    style={{
                                      width:36,
                                      height:36,
                                      transform:[
                                        {scale:touchX.interpolate({
                                          inputRange:[LEFT_ALIGN,IMOJI_WIDTH*2,IMOJI_WIDTH*3,IMOJI_WIDTH*3],
                                          outputRange:[1,1,2.4,1]
                                        })}
                                      ]
                                    }}/>
                            </Animated.View>
                            <Animated.View style={{
                              flex:1,
                              justifyContent:'center',
                              alignItems:'center',
                              opacity:wowX.interpolate({inputRange:[0,48],outputRange:[1,0]}),
                              transform:[
                                {
                                  translateY:wowX
                                },
                                {
                                  scale:wowX.interpolate({inputRange:[0,48],outputRange:[1,0]})
                                }
                            ]
                              }}>
                                <Animated.View style={[styles.tooltip,{
                                   opacity:touchX.interpolate({
                                    inputRange:[LEFT_ALIGN,IMOJI_WIDTH*3+LEFT_ALIGN,IMOJI_WIDTH*4+LEFT_ALIGN,IMOJI_WIDTH*4+LEFT_ALIGN],
                                    outputRange:[0,0,1,0]
                                   })
                                }]}>
                                  <Text style={{fontSize:11,color:"white",textAlign:"center",fontWeight:'bold'}}>Wow</Text>
                                </Animated.View>
                                <Animated.Image 
                                    source={require('./assets/images/surprised.png')} 
                                    style={{
                                      width:36,
                                      height:36,
                                      transform:[
                                        {scale:touchX.interpolate({
                                          inputRange:[LEFT_ALIGN,IMOJI_WIDTH*3+LEFT_ALIGN,IMOJI_WIDTH*4+LEFT_ALIGN,IMOJI_WIDTH*4+LEFT_ALIGN],
                                          outputRange:[1,1,2.4,1]
                                        })}
                                      ]
                                    }}/>
                            </Animated.View>
                            <Animated.View  style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                opacity:cryX.interpolate({inputRange:[0,56],outputRange:[1,0]}),
                                transform:[
                                  {
                                  translateY:cryX
                                  },
                                  {
                                    scale:cryX.interpolate({inputRange:[0,56],outputRange:[1,0]})
                                  }
                              ]
                                }}>
                                  <Animated.View style={[styles.tooltip,{
                                   opacity:touchX.interpolate({
                                    inputRange:[LEFT_ALIGN,IMOJI_WIDTH*4+LEFT_ALIGN,IMOJI_WIDTH*5+LEFT_ALIGN,IMOJI_WIDTH*5+LEFT_ALIGN],
                                    outputRange:[0,0,1,0]
                                   })
                                }]}>
                                  <Text style={{fontSize:11,color:"white",textAlign:"center",fontWeight:'bold'}}>Sad</Text>
                                </Animated.View>
                                <Animated.Image 
                                    source={ require('./assets/images/crying.png')} 
                                    style={{
                                      width:36,
                                      height:36,
                                      transform:[
                                        {scale:touchX.interpolate({
                                          inputRange:[LEFT_ALIGN,IMOJI_WIDTH*4+LEFT_ALIGN,IMOJI_WIDTH*5+LEFT_ALIGN,IMOJI_WIDTH*5+LEFT_ALIGN],
                                          outputRange:[1,1,2.4,1]
                                        })}
                                      ]
                                    }}/>
                            </Animated.View>
                            <Animated.View  style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                opacity:angryX.interpolate({inputRange:[0,64],outputRange:[1,0]}),
                                transform:[
                                  {
                                  translateY:angryX
                                  },
                                  {
                                    scale:angryX.interpolate({inputRange:[0,64],outputRange:[1,0]})
                                  }
                              ]
                                }}>
                                   <Animated.View style={[styles.tooltip,{
                                   opacity:touchX.interpolate({
                                    inputRange:[LEFT_ALIGN,IMOJI_WIDTH*5+LEFT_ALIGN,IMOJI_WIDTH*6+LEFT_ALIGN,IMOJI_WIDTH*6+LEFT_ALIGN],
                                    outputRange:[0,0,1,0]
                                   })
                                }]}>
                                  <Text style={{fontSize:11,color:"white",textAlign:"center",fontWeight:'bold'}}>Angry</Text>
                                </Animated.View>
                                <Animated.Image 
                                    source={require('./assets/images/angry.png')} 
                                    style={{
                                      width:36,
                                      height:36,
                                      transform:[
                                        {scale:touchX.interpolate({
                                          inputRange:[LEFT_ALIGN,IMOJI_WIDTH*5+LEFT_ALIGN,IMOJI_WIDTH*6+LEFT_ALIGN,IMOJI_WIDTH*6+LEFT_ALIGN],
                                          outputRange:[1,1,2.4,1]
                                        })}
                                      ]
                                    }}/>
                            </Animated.View>
                                
                                      
                          

                        </Animated.View>

                  </Animated.View>
                   
                </PanGestureHandler>
                
           </View>
         )
       })
     }

     

   </ScrollView>
  )
}


const styles = StyleSheet.create({
  post:{
    width:width,
    height:500,
    paddingVertical:20,
    marginBottom:20,
    backgroundColor:'#282828',
    position:'relative'
  },
  userHeader:{
   // width:width,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
   
    
  },
  postHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20,
    paddingHorizontal:10
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:25,
    marginRight:16
 
  },
  reactionView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  reactButton:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:12
  },
  imojiView:{
    backgroundColor:'#505050',
    borderRadius:50,
    flexDirection:'row',
    alignItems:'center',
    height:50,
    
  },
  imojiViewWraper:{
    position:'absolute',
    width:width*90/100,
    height:150,
    top:'70%',
    left:LEFT_ALIGN,
    justifyContent:'center',
    alignItems:'center'
   
  },
  tooltip:{
    position:'absolute',
    top:-65,
    left:0,
    backgroundColor:'rgba(8,8,8,0.8)',
    paddingHorizontal:12,
    paddingVertical:8,
    borderRadius:18

    
  }



})

