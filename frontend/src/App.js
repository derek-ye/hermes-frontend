import './App.css';
import { extendTheme, Box, Center, Text } from "@chakra-ui/react"
import Store from "./Shop"

function App() {
  return (
      <Box>
        <Center>
          <Box h='15vh' mt='5vh'>
            <Text fontSize="2em">
              {/* One-Item Store */}
            </Text>
          </Box>
        </Center>
        <Center>
          <Store/>
        </Center>
        
      </Box>

  );
}

export default App;
