import { View, Text, StyleSheet, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from 'react-native-paper'
import { Dimentions } from '../Matrices'
import { getPosts } from '../Services/posts'
import { ROUTES } from '../Navigation/ROUTES'
import { useUserStore } from '../State/User.state'


const Profile = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const user = useUserStore()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const postRes = await getPosts()
        setPosts(postRes.data)
      } catch (error) {

      } finally {
        setLoading(false)
      }
    }
    fetchPosts()

    navigation.setOptions({
      title: user.username
    })

  }, [])

  const editProfile = () => {
    navigation.navigate(ROUTES.PROFILE_EDIT)
  }


  const Item = ({ image }) => {
    return (
      <View style={styles.itemWrapper}>
        <Image
          source={{ uri: image }}
          style={{ aspectRatio: 1 }}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.p20}>
        <View style={[styles.row, styles.alignCenter]}>
          <View style={styles.avatarWrapper}>
            <Avatar.Image
              size={100}
              style={styles.avatar}
              source={user.profileUrl ? { uri: user.profileUrl } : require('../Assets/avatar.png')}
            />
          </View>
          <View style={styles.detailsWrapper}>
            <View style={styles.alignCenter}>
              <Text style={styles.h3}>10</Text>
              <Text style={styles.p}>Posts</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FRIEND_LIST)}>
              <View style={styles.alignCenter}>
                <Text style={styles.h3}>10</Text>
                <Text style={styles.p}>Followers</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.alignCenter}>
              <Text style={styles.h3}>10</Text>
              <Text style={styles.p}>Following</Text>
            </View>
          </View>
        </View>
        <Text style={styles.h3}>{user.firstName} {user.lastName}</Text>
        <Text style={[styles.p, styles.mb10]}>{user.bio}</Text>
        <Button
          labelStyle={{ color: '#000' }}
          style={styles.but}
          onPress={editProfile}
        >Edit Profile</Button>
      </View>
      <FlatList
        data={posts}
        style={styles.postList}
        renderItem={({ item, index }) => <Item key={index} {...item} />}
        refreshing={isLoading}
        numColumns={3}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={isLoading} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: "space-between"
  },
  avatarWrapper: {
    flex: 1,
  },
  avatar: {
    backgroundColor: '#fff',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row'
  },
  detailsWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  h3: {
    color: "#000",
    fontWeight: 'bold',
    fontSize: 14
  },
  p: {
    color: "#000",
    fontSize: 14
  },
  mb10: {
    marginBottom: 10
  },
  postList: {
    width: Dimentions.screenWidth,
  },
  itemWrapper: {
    margin: 2,
    flex: 1
  },
  p20: {
    padding: Dimentions.PADDING
  },
  but: {
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    color: "#000"
  }
})

export default Profile