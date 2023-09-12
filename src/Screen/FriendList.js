import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUsers } from '../Services/users'
import { Avatar } from 'react-native-paper'
import { Dimentions } from '../Matrices'

const FriendList = () => {
  const [friendList, setFriendList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        let res = await getUsers()
        setFriendList(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const Item = ({ username, name }) => {
    return (
      <View style={styles.itemWrapper}>
        <Avatar.Image
          style={styles.avatar}
          source={require("../Assets/avatar.png")}
        />
        <View>
          <Text>{username}</Text>
          <Text>{name.firstname} {name.lastname}</Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={friendList}
      renderItem={({ item, index }) => <Item key={index.toString()} {...item} />}
      refreshControl={<RefreshControl refreshing={loading} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  avatar: {
    backgroundColor: '#fff',
    marginRight: Dimentions.MARGIN
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  }
})

export default FriendList