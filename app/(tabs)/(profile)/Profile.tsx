import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useRouter } from "expo-router";
  import { useAuth } from "@clerk/clerk-expo";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db } from "@/firebaseConfig";
  import { useDispatch } from "react-redux";
  import { AppDispatch } from "@/redux/store";
  
  const ProfilePage = () => {
    const { userId } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
  
    useEffect(() => {
      const fetchUserData = async () => {
        if (userId) {
          try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserData(data);
              setName(data.name || "");
              setEmail(data.email || "");
              setPhone(data.phone || "");
            } else {
              Alert.alert("Error", "No user data found.");
            }
          } catch (error) {
            Alert.alert("Error", "Failed to fetch user data.");
          }
        }
      };
      fetchUserData();
    }, [userId]);
  
    const updateProfile = async () => {
      if (!name || !email || !phone) {
        Alert.alert("Validation Error", "Please fill in all fields.");
        return;
      }
      setLoading(true);
      try {
        const updatedData = { name, email, phone };
        await setDoc(doc(db, "users", userId!), updatedData, { merge: true });
        setUserData(updatedData);
        setIsEditing(false);
      } catch (error) {
        Alert.alert("Error", "Failed to update profile.");
      }
      setLoading(false);
    };
  
    return (
      <View className="flex-1 bg-gray-100 p-6">
        {userData ? (
          <>
            <View className="mb-6">
              <Text className="text-gray-700 text-sm font-medium">Name:</Text>
              {isEditing ? (
                <TextInput
                  value={name}
                  onChangeText={setName}
                  className="border border-gray-300 p-3 mt-2 bg-white rounded-lg shadow-sm"
                  placeholder="Enter your name"
                />
              ) : (
                <Text className="text-xl mt-2 text-gray-800">{userData.name}</Text>
              )}
            </View>
            <View className="mb-6">
              <Text className="text-gray-700 text-sm font-medium">Email:</Text>
              {isEditing ? (
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  editable={false}
                  className="border border-gray-300 p-3 mt-2 bg-gray-200 rounded-lg"
                />
              ) : (
                <Text className="text-xl mt-2 text-gray-800">{userData.email}</Text>
              )}
            </View>
            <View className="mb-6">
              <Text className="text-gray-700 text-sm font-medium">Phone Number:</Text>
              {isEditing ? (
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  className="border border-gray-300 p-3 mt-2 bg-white rounded-lg shadow-sm"
                  placeholder="Enter your phone number"
                />
              ) : (
                <Text className="text-xl mt-2 text-gray-800">{userData.phone || "N/A"}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (isEditing) {
                  updateProfile();
                } else {
                  setIsEditing(true);
                }
              }}
              className="bg-red-500 py-3 px-8 rounded-full mt-4 self-center"
            >
              <Text className="text-white text-lg font-semibold">
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Text>
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator size="large" color="red" className="mt-4" />
            )}
          </>
        ) : (
          <ActivityIndicator size="large" color="red" />
        )}
      </View>
    );
  };
  
  export default ProfilePage;
  