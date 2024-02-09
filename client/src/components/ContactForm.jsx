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
				className="w-full max-w-xs px-6 mx-auto border rounded-lg md:max-w-md border-zinc-300"
			>
				<h1 className="my-3 text-3xl font-bold text-center text-zinc-700">
					Contattaci
				</h1>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="name" className="px-1">
						Nome
					</label>
					<input
						type="text"
						name="name"
						placeholder="Inserici Nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="email" className="px-1">
						Email
					</label>
					<input
						type="email"
						name="email"
						placeholder="Inserici Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="message" className="px-1">
						Di quale gatto vorresti ricevere informazioni?
					</label>
					<textarea
						name="message"
						placeholder="Scrivi qui il tuo messaggio, ti risponderemo appena possibile..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
						rows="4"
					/>
				</div>

				<SubmitButton>Invia messaggio</SubmitButton>
			</form>
		</div>
	);
};

export default ContactForm;
