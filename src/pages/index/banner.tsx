import React, { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";
import { Box, Button } from "zmp-ui";
import axios from "axios";

const API_ENDPOINT = "https://graph.zalo.me/v2.0/me/info";
const SECRET_KEY = "QYUWvhv4y824M78BUF8r";

const getUserPhoneNumber = async (
  userAccessToken: string,
  token: string,
  secretKey: string
) => {
  const params = {
    access_token: userAccessToken,
    code: token,
    secret_key: secretKey,
  };

  try {
    const response = await axios.get(API_ENDPOINT, { params });

    if (response.status === 200) {
      return response.data.data.number;
    }
  } catch (error) {
    console.error("Error making API request:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const Banner: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const handleClicked = async () => {
    try {
      setIsLoading(true);

      // Step 1: Get the user access token
      const userAccessToken = await getAccessToken({});
      console.log("User Access Token:", userAccessToken);

      // Step 2: Use the access token to fetch the phone number
      const phoneData = await getPhoneNumber({
        success: async (data) => {
          console.log("Token Response Data:", data);
          const token = data.token as string; // Access the token property

          // Step 3: Fetch the phone number using the token
          const phoneNumber = await getUserPhoneNumber(
            userAccessToken,
            token,
            SECRET_KEY
          );
          setPhoneNumber(phoneNumber); // Set the phone number in state
        },
        fail: (error) => {
          console.error("Failed to fetch phone number:", error);
        },
      });
    } catch (error) {
      // Handle API failure
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="bg-white" pb={4}>
      <Swiper>
        <SwiperSlide className="px-4">
          <Box className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton">
            <Box className="grid place-content-center text-center h-48">
              {phoneNumber ? (
                // If phoneNumber is not null, display it
                <p>Phone Number: {phoneNumber}</p>
              ) : (
                // If phoneNumber is null, display the button
                <>
                  <Button onClick={handleClicked} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Nhấn để đăng ký / đăng nhập"}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};
