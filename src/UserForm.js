import { useForm } from 'react-hook-form';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom';

import './style.css';

export const UserForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            country: 'IN',
            state: 'MP',
            city: 'Shujalpur'
        }
    });

    const countries = Country.getAllCountries();
    const country = register("country");
    const selectedCountryCode = watch("country", 'IN');


    const state = register('state');
    const allState = (State.getStatesOfCountry(`${selectedCountryCode}`));
    const selectedStateCode = watch('state', 'MP');

    const city = register('city');
    const cities = City.getCitiesOfState(selectedCountryCode, selectedStateCode);
    const selectedCity = watch('city');
    const onSubmit = data => {
        const otp = Math.trunc(Math.random() * 10001);
        console.log('otp = ', otp)
        localStorage.setItem('otp', otp)
        navigate('/otp');
    };
    return (
        <>
            <div className='container' >
                <h1 className='title'>User Registration Form</h1>
                <form className='userForm' onSubmit={handleSubmit(onSubmit)} >
                    <div className='userField'>

                        <input placeholder='First name' maxLength='8' type='text'{...register('firstName',
                            {
                                required: 'First name is required',
                                minLength: { value: 3, message: 'Name too short' },
                                pattern: { value: /^[a-z]+$/, message: 'Name must be letter' }
                            })}
                            aria-invalid={errors.firstName ? "true" : "false"} />
                        <p className='error' >{errors?.firstName?.message}</p>
                    </div>

                    <div className='userField'>
                        <input placeholder='Last name' {...register('lastName',
                            {
                                required: 'Last name is required',
                                minLength: { value: 3, message: 'Name too short' },
                                pattern: { value: /^[a-z]+$/, message: 'Name must be letter' }
                            })}
                            aria-invalid={errors.lastName ? "true" : "false"} />
                        <p className='error' >{errors?.lastName?.message}</p>
                    </div>

                    <div className='userField'>
                        <input placeholder='Email ' {...register('email',
                            {
                                required: 'Email is required',
                                pattern: { value: /^[\w]+@([\w]+\.)+[\w-]{2,4}/, message: 'Enter valid email id' }
                            })}
                            aria-invalid={errors.email ? "true" : "false"} />
                        <p className='error' >{errors.email?.message}</p>
                    </div>

                    <div className='userField'>
                        <select
                            {...register('phoneCode')}
                            className='countryCode'><option value='91'>91</option>
                            {countries.map((country, index) => (<option key={index + 1} value={country.phonecode}>{country.phonecode}</option>))}
                        </select>
                        <input className='inputField' placeholder='Mobile no ' maxLength='10' {...register('mobNo',
                            {
                                required: 'Mobile No is required',
                                pattern: { value: /^[\d]{10}/, message: 'Must be 10 digit number' }

                            })}
                            aria-invalid={errors.mobNo ? "true" : "false"} />
                        <p className='error' >{errors.mobNo?.message}</p>
                    </div>
                    <div >
                        <select className='address' onChange={e => country.onChange(e)}
                            {...register('country', { required: 'country' })}
                        >
                            <option>Select country</option>
                            {countries.map((country, index) => (<option key={index + 1} value={country.isoCode}>{country.name}</option>))}
                        </select>
                        <p className='error' >{errors.countries?.message}</p>
                    </div>
                    <div>
                        <select className='address' onChange={e => state.onChange(e)}
                            {...register('state', { required: 'Select state' })}>
                            <option>Select state</option>
                            {allState?.map((state, index) => (<option key={index + 1} value={state.isoCode}>{state.name}</option>))}
                        </select>
                    </div>

                    <div>
                        <select className='address'
                            {...register('city', { required: 'Select city' })}
                            onBlur={city.onBlur}
                            ref={city.ref} >
                            <option>Select city</option>
                            {cities?.map((city, index) => (<option key={index + 1} value={city.isoCode}>{city.name}</option>))}
                        </select>
                    </div>
                    <div className='userField'>

                        <input placeholder='Password ' maxLength='8' type='password' {...register('password',
                            {
                                required: 'Password is required',
                                pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,8}$/, message: 'Enter valid password' }
                            })}
                            aria-invalid={errors.password ? "true" : "false"} />
                        <p className='error ' >{errors.password?.message}</p>
                    </div>

                    <div className='useriFeld'>
                        <button className='buttonSubmit' value='Submit' >Submit</button>
                    </div>

                </form>

            </div>
        </>
    )
}