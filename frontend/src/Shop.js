import { Box, Image, Badge } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// require('dotenv').config('../.env')

// console.log()


const stripePromise = loadStripe('pk_test_51ILEJGGotOCxOgU4zQWT3ASkKwnwAqI0vDSaXFiUrilMwM3TJUhspBSr3QMHkaPBqFKigxYY8mo2K1PNle8ZUXMU007C3fpTn0');

function Store() {
    const property = {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    }

    const item = {
        imageUrl: "https://www.justonecookbook.com/wp-content/uploads/2019/11/Japanese-Cheesecake-4631-I.jpg",
        imageAlt: "Japanese Cheesecake",
        price: "$19.00",
        description: "A light cheesecake.",
        title: "Deluxe Cheesecake",
        rating: 5,
        reviewCount: 9
    }
  
    return (
      <Elements stripe={stripePromise}>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{ cursor: "pointer" }} onClick={redirectOnClick}>
          <Image src={item.imageUrl} alt={item.imageAlt}/>
    
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge> */}
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="0%"
                fontSize="xs"
              >
                {item.description}
              </Box>
            </Box>
    
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {item.title}
            </Box>
    
            <Box>
              {item.price}
            </Box>
    
            <Box d="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < item.rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {item.reviewCount} reviews
              </Box>
            </Box>
          </Box>
        </Box>
      </Elements>
    )
}

function redirectOnClick() {
  fetch("http://localhost:3000/stripe/create-checkout-session", {
    method: "POST",
  })

    .then(function (response) {
      return response.json();
    })
    .then(async function (session) {
      const stripe = await stripePromise;
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.

      if (result.error) {

        alert(result.error.message);

      }

    })

    .catch(function (error) {

      console.error("Error:", error);

    });
    console.log("HELLO");
}

export default Store;