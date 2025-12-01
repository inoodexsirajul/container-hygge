{{-- <x-guest-layout>
    <form method="POST" action="{{ route('password.store') }}">
        @csrf

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email', $request->email)" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                                type="password"
                                name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Reset Password') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Your App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .input-group {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .input-group input:focus + label,
        .input-group input:not(:placeholder-shown) + label {
            transform: translateY(-25px) scale(0.85);
            color: #667eea;
            background-color: white;
            padding: 0 4px;
            left: 8px; /* Adjusted when label moves up */
        }
        
        .floating-label {
            position: absolute;
            pointer-events: none;
            left: 40px; /* Adjusted to account for icon */
            top: 12px;
            transition: 0.2s ease all;
            color: #9ca3af;
            z-index: 1;
        }
        
        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        .input-icon {
            position: absolute;
            left: 12px;
            z-index: 10; /* Increased z-index to ensure it's always on top */
            color: #9ca3af;
            pointer-events: none;
            transition: color 0.2s ease;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .input-wrapper:focus-within .input-icon {
            color: #667eea;
        }
        
        .password-toggle {
            position: absolute;
            right: 12px;
            z-index: 10; /* Increased z-index */
            cursor: pointer;
            color: #9ca3af;
            transition: color 0.2s ease;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .password-toggle:hover {
            color: #667eea;
        }
        
        .input-field {
            padding-left: 40px;
            padding-right: 40px;
            width: 100%;
            position: relative;
            z-index: 1; /* Lower z-index than icons */
        }
        
        .reset-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
        }
        
        .reset-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        
        .shape {
            position: absolute;
            z-index: -1;
        }
        
        .shape-1 {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            top: -150px;
            right: -100px;
            opacity: 0.7;
        }
        
        .shape-2 {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            bottom: -100px;
            left: -50px;
            opacity: 0.7;
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .error-shake {
            animation: shake 0.5s;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .custom-input {
            outline: none !important;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        
        .custom-input:focus {
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        .password-strength {
            height: 4px;
            border-radius: 2px;
            margin-top: 8px;
            transition: all 0.3s ease;
        }
        
        .strength-weak { background-color: #ef4444; width: 33%; }
        .strength-medium { background-color: #f59e0b; width: 66%; }
        .strength-strong { background-color: #10b981; width: 100%; }
        
        .requirements {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 0.5rem;
        }
        
        .requirement {
            display: flex;
            align-items: center;
            margin-bottom: 0.25rem;
        }
        
        .requirement i {
            margin-right: 0.5rem;
            width: 1rem;
        }
        
        .requirement.met {
            color: #10b981;
        }
        
        .requirement.unmet {
            color: #ef4444;
        }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <!-- Background Shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    
    <!-- Reset Password Container -->
    <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-8 fade-in">
        <!-- Logo and Title -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-4">
                <i class="fas fa-lock text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800">Reset Password</h1>
            <p class="text-gray-600 mt-2">Enter your new password below</p>
        </div>
        
        <!-- Reset Password Form -->
        <form method="POST" action="{{ route('password.store') }}">
            @csrf
            
            <!-- Password Reset Token -->
            <input type="hidden" name="token" value="{{ $request->route('token') }}">

            <!-- Email Address -->
            <div class="input-group">
                <div class="input-wrapper">
                    {{-- <i class="fas fa-envelope input-icon"></i> --}}
                    <input 
                        id="email" 
                        class="custom-input input-field block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                        type="email" 
                        name="email" 
                        placeholder=" " 
                        value="{{ old('email', $request->email) }}" 
                        required 
                        autofocus 
                        autocomplete="username" 
                    />
                    <label for="email" class="floating-label">{{ __('Email') }}</label>
                </div>
                @if ($errors->has('email'))
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $errors->first('email') }}
                    </div>
                @endif
            </div>

            <!-- Password -->
            <div class="input-group">
                <div class="input-wrapper">
                    {{-- <i class="fas fa-lock input-icon"></i> --}}
                    <input 
                        id="password" 
                        class="custom-input input-field block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                        type="password" 
                        name="password" 
                        placeholder=" " 
                        required 
                        autocomplete="new-password"
                        oninput="checkPasswordStrength(this.value)"
                    />
                    <label for="password" class="floating-label">{{ __('Password') }}</label>
                    <div class="password-toggle" onclick="togglePassword('password')">
                        <i id="password-icon" class="fas fa-eye"></i>
                    </div>
                </div>
                <div id="password-strength" class="password-strength"></div>
                @if ($errors->has('password'))
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $errors->first('password') }}
                    </div>
                @endif
            </div>

            <!-- Confirm Password -->
            <div class="input-group">
                <div class="input-wrapper">
                    {{-- <i class="fas fa-lock input-icon"></i> --}}
                    <input 
                        id="password_confirmation" 
                        class="custom-input input-field block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                        type="password" 
                        name="password_confirmation" 
                        placeholder=" " 
                        required 
                        autocomplete="new-password"
                    />
                    <label for="password_confirmation" class="floating-label">{{ __('Confirm Password') }}</label>
                    <div class="password-toggle" onclick="togglePassword('password_confirmation')">
                        <i id="password-confirmation-icon" class="fas fa-eye"></i>
                    </div>
                </div>
                @if ($errors->has('password_confirmation'))
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $errors->first('password_confirmation') }}
                    </div>
                @endif
            </div>
            
            <!-- Password Requirements -->
            {{-- <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <p class="text-sm font-medium text-gray-700 mb-2">Password must:</p>
                <div class="requirements">
                    <div id="req-length" class="requirement unmet">
                        <i class="fas fa-times-circle"></i>
                        Be at least 8 characters
                    </div>
                    <div id="req-uppercase" class="requirement unmet">
                        <i class="fas fa-times-circle"></i>
                        Contain at least one uppercase letter
                    </div>
                    <div id="req-lowercase" class="requirement unmet">
                        <i class="fas fa-times-circle"></i>
                        Contain at least one lowercase letter
                    </div>
                    <div id="req-number" class="requirement unmet">
                        <i class="fas fa-times-circle"></i>
                        Contain at least one number
                    </div>
                </div>
            </div> --}}

            <div class="flex items-center justify-end mt-4">
                <button type="submit" class="reset-btn flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="mr-2">{{ __('Reset Password') }}</span>
                    <i class="fas fa-check"></i>
                </button>
            </div>
        </form>
        
        <!-- Back to Login -->
        <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
                <a href="{{ route('admin.login') }}" class="font-medium text-indigo-600 hover:text-indigo-800 transition duration-200">
                    {{ __('Back to login') }}
                </a>
            </p>
        </div>
    </div>
    
    <script>
        // Toggle password visibility
        function togglePassword(fieldId) {
            const passwordInput = document.getElementById(fieldId);
            const passwordIcon = document.getElementById(fieldId + '-icon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        }
        
        // Check password strength
        function checkPasswordStrength(password) {
            const strengthBar = document.getElementById('password-strength');
            let strength = 0;
            
            // Check requirements
            const hasLength = password.length >= 8;
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            
            // Update requirement indicators
            updateRequirement('req-length', hasLength);
            updateRequirement('req-uppercase', hasUppercase);
            updateRequirement('req-lowercase', hasLowercase);
            updateRequirement('req-number', hasNumber);
            
            // Calculate strength
            if (hasLength) strength++;
            if (hasUppercase) strength++;
            if (hasLowercase) strength++;
            if (hasNumber) strength++;
            
            // Update strength bar
            strengthBar.className = 'password-strength';
            if (password.length > 0) {
                if (strength <= 2) {
                    strengthBar.classList.add('strength-weak');
                } else if (strength === 3) {
                    strengthBar.classList.add('strength-medium');
                } else {
                    strengthBar.classList.add('strength-strong');
                }
            }
        }
        
        // Update requirement indicator
        function updateRequirement(id, isValid) {
            const element = document.getElementById(id);
            const icon = element.querySelector('i');
            
            if (isValid) {
                element.classList.remove('unmet');
                element.classList.add('met');
                icon.classList.remove('fa-times-circle');
                icon.classList.add('fa-check-circle');
            } else {
                element.classList.remove('met');
                element.classList.add('unmet');
                icon.classList.remove('fa-check-circle');
                icon.classList.add('fa-times-circle');
            }
        }
    </script>
</body>
</html>
