import React from 'react'
import { useToast } from "@chakra-ui/toast";
import { Container, Flex, Text, Box, Link, Button } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"

function ToastExample() {


  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  )
}
const APIsPage = () => {

  const toast = useToast()

  const showToast = () => {
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }
  return (
    <div>APIsPage
      <Button
      onClick={() =>
        toaster.create({
          title: "File saved",
          description: "File saved successfully",
          type: "success",
          duration: 3500,
        })}
      >Click me</Button>

    </div>
    
  )
}

export default APIsPage