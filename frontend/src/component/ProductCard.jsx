import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Toast, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {

    // SO THAT COLOR CHANGES WITH THE MODE
    const textColor = useColorModeValue("gray.600", "gra.200");
    const bgColor = useColorModeValue("white", "gray.800");
    const {deleteProduct, updateProduct} = useProductStore();

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success){
            toast({
                title:"Error",
                description:message,
                status:"error",
                isClosable:true
            })
        }
        else{
            toast({
                title:"Success",
                description:message,
                status:"success",
                isClosable:true
            })
        }
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        if(!success){
            toast({
                title:"Error",
                description:message,
                status:"error",
                isClosable:true
            })
        }
        else{
            toast({
                title:"Success",
                description:message,
                status:"success",
                isClosable:true
            })
        }
    }

  return (
    <Box>
        <Box overflow={"hidden"} transition={"all 0.3s"} rounded={"lg"} shadow={"md"} _hover={{transform:"translateY(-5px)", shadow:"xl", bg:{bgColor}}}>
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>

            <Box p={4}>
                <Heading as={"h3"} size={"md"}>{product.name}</Heading>

                <Text fontSize={"xl"} fontWeight={"bold"} textColor={textColor} mb={4}>${product.price}</Text>
            </Box>

            <HStack spacing={2}>
                <IconButton icon={<FaEdit />} colorScheme={"blue"} onClick={onOpen}/>
                <IconButton icon={<FaTrash />} colorScheme={"red"} onClick={() => handleDeleteProduct(product._id)} />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>

            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <VStack spacing={4}>
                    
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name:e.target.value})}
                        />
                        <Input 
                            placeholder='Product Price'
                            name='price'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price:e.target.value})}
                        />
                        <Input 
                            placeholder='Product Image URL'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image:e.target.value})}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)} >
                        Update
                    </Button>
                    <Button variant={'ghost'} onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
    

    
  )
}

export default ProductCard