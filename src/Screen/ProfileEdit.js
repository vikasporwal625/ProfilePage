import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { Dimentions } from '../Matrices'
import { Formik, useFormik } from 'formik'
import { userSchema } from '../Schemas/User.schema'
import { useUserStore } from '../State/User.state'
import { launchImageLibrary } from 'react-native-image-picker'

const ProfileEdit = ({ navigation }) => {
  const [isEditable, setEditable] = useState(false)
  const user = useUserStore()
  const { updateUser } = useUserStore(state => state)
  const [profileUrl, setProfileUrl] = useState(user.profileUrl)
  const formikRef = useRef()

  const handleSave = (userData) => {
    let user = { ...userData }
    if (profileUrl !== user.profileUrl) {
      user.profileUrl = profileUrl
    }
    updateUser(user)
    Alert.alert("Success", "User data updated")
  }

  const openImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 1
      });
      setProfileUrl(result.assets[0].uri)
      console.log(result)
    } catch (error) {

    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => formikRef.current.handleSubmit()}
        >
          <Text>{"Save"}</Text>
        </TouchableOpacity>
      )
    })
  }, [isEditable])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={user}
      validationSchema={userSchema}
      onSubmit={handleSave}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Avatar.Image
            size={150}
            style={styles.avatar}
            source={profileUrl ? { uri: profileUrl } : require('../Assets/avatar.png')}
          />
          <Button onPress={openImagePicker}>Edit avatar</Button>
          <TextInput
            id='firstName'
            label={"First Name"}
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur("firstName")}
            style={styles.input}
            underlineStyle={{ padding: 0 }}
          />
          {errors.firstName && touched.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          <TextInput
            id='lastName'
            label={"Last Name"}
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            style={styles.input}
          />
          {errors.lastName && touched.lastName && <Text>{errors.lastName}</Text>}
          <TextInput
            id='bio'
            label={"Bio"}
            value={values.bio}
            onChangeText={handleChange('bio')}
            onBlur={handleBlur('bio')}
            style={styles.input}
          />
          {errors.bio && touched.bio && <Text>{errors.bio}</Text>}
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: Dimentions.PADDING,
    backgroundColor: "white"
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: '#fff'
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 0
  },
  errorText: {
    color: 'red',
    marginBottom: 10
  }
})

export default ProfileEdit