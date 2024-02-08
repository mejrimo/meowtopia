import { useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

import SubmitButton from './SubmitButton';

const ContactForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_meowtopia',
				'template_6bt2439',
				e.target,
				'4nic3cBwlyEWFM00S'
			)
			.then(
				(result) => {
					toast.success('Email successfully sent');
					console.log(result.text);
				},
				(error) => {
					toast.error('Email sending failed');
					console.log(error.text);
				}
			)
			.then(() => {
				setName('');
				setEmail('');
				setMessage('');
			});
	};

	return (
		<div className="flex flex-col justify-center my-7">
			<form
				onSubmit={sendEmail}
				className="max-w-md px-6 mx-auto border rounded-lg md:w-full border-zinc-300"
			>
				<h1 className="my-3 text-3xl font-bold text-center text-zinc-700">
					Contact Us
				</h1>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="name" className="px-1">
						Your Name
					</label>
					<input
						type="text"
						name="name"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="email" className="px-1">
						Email Address
					</label>
					<input
						type="email"
						name="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="message" className="px-1">
						Which cat do you want information about?
					</label>
					<textarea
						name="message"
						placeholder="Write here your message, we'll reply as soon as possible..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="block w-full p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
						rows="4"
					/>
				</div>

				<SubmitButton>Send message</SubmitButton>
			</form>
		</div>
	);
};

export default ContactForm;
