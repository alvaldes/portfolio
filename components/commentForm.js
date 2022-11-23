import { EmailIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Section from './section'

const Form = props => {
  const [comment, setComment] = useState('')
  const [CommentError, setCommentError] = useState('')

  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    if (comment === '') {
      setCommentError('Message is required.')
    } else {
      let body = `body=${encodeURIComponent(comment)}`
      // router.push('/thanks')
      router.push(
        `mailto:angelluis2605@gmail.com?subject=${encodeURIComponent(
          `Message from Portfolio`
        )}&${body}`
      )
      setComment('')
    }
  }

  return (
    <Section delay={0.3} id={props.id} mt={8}>
      {router.pathname != '/' && (
        <Divider
          sx={{ borderBottomWidth: 2 }}
          mb={10}
          borderColor={useColorModeValue('gray.700', 'whiteAlpha.500')}
        />
      )}
      <Container maxWidth="container.lg">
        <Heading
          fontSize={24}
          mt={3}
          mb={5}
          variant="section-title"
          align="left"
        >
          Contact Me
        </Heading>

        <FormControl isInvalid={CommentError} isRequired my={5}>
          <FormLabel htmlFor="email">Message</FormLabel>
          <Textarea
            id="comment"
            value={comment}
            placeholder="Enter your message here."
            onChange={e => setComment(e.target.value)}
            borderColor={useColorModeValue('gray.500', 'whiteAlpha.300')}
            _placeholder={{
              color: useColorModeValue('gray.500', 'whiteAlpha.300')
            }}
          />
          {CommentError && <FormErrorMessage>{CommentError}</FormErrorMessage>}
        </FormControl>

        <Button
          leftIcon={<EmailIcon />}
          colorScheme="teal"
          variant="solid"
          mb={5}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Container>
    </Section>
  )
}

export default Form
