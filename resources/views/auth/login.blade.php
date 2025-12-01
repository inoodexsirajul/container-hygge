{{-- <x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" class="font-bold text-black"/>
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            @if ($errors->has('email'))
                <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-semibold">
                    {{ $errors->first('email') }}
                </div>
            @endif
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" class="font-bold text-black" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">
                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
                <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('password.request') }}">
                    {{ __('Forgot your password?') }}
                </a>
            @endif

            <x-primary-button class="ms-3">
                {{ __('Log in') }}
            </x-primary-button>
        </div>

        <div class="flex items-center justify-center mt-6">
            @if (Route::has('register'))
                <a class="underline text-sm text-blue-600 hover:text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" href="{{ route('register') }}">
                    {{ __('Don\'t have an account? Register') }}
                </a>
            @endif
        </div>
    </form>
</x-guest-layout> --}}


{{-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Your App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden; /* Prevent horizontal scrollbar */
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            position: relative;
            overflow: hidden; /* Prevent overflow from shapes */
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
        }
        
        .floating-label {
            position: absolute;
            pointer-events: none;
            left: 12px;
            top: 12px;
            transition: 0.2s ease all;
            color: #9ca3af;
        }
        
        .password-toggle {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #9ca3af;
        }
        
        .login-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
        }
        
        .login-btn:hover {
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
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <!-- Background Shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    
    <!-- Login Container -->
    <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-8 fade-in">
        <!-- Logo and Title -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-4">
                <i class="fas fa-user-shield text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p class="text-gray-600 mt-2">Sign in to continue to your account</p>
        </div>
        
        <!-- Session Status -->
        @if(session('status'))
            <div class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium fade-in">
                {{ session('status') }}
            </div>
        @endif
        
        <!-- Login Form -->
        <form method="POST" action="{{ route('login') }}" class="space-y-6">
            @csrf
            
            <!-- Email Address -->
            <div class="input-group">
                <x-text-input 
                    id="email" 
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                    type="email" 
                    name="email" 
                    placeholder=" " 
                    :value="old('email')" 
                    required 
                    autofocus 
                    autocomplete="username" 
                />
                <label for="email" class="floating-label">Email Address</label>
                @error('email')
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            
            <!-- Password -->
            <div class="input-group">
                <x-text-input 
                    id="password" 
                    class="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                    type="password" 
                    name="password" 
                    placeholder=" " 
                    required 
                    autocomplete="current-password" 
                />
                <label for="password" class="floating-label">Password</label>
                <div class="password-toggle" onclick="togglePassword()">
                    <i id="password-icon" class="fas fa-eye"></i>
                </div>
                @error('password')
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            
            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" name="remember">
                    <label for="remember_me" class="ml-2 block text-sm text-gray-700">
                        Remember me
                    </label>
                </div>
                
                @if (Route::has('password.request'))
                    <a class="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-200" href="{{ route('password.request') }}">
                        Forgot your password?
                    </a>
                @endif
            </div>
            
            <!-- Login Button -->
            <div>
                <button type="submit" class="login-btn w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="mr-2">Sign In</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </form>
        
        <!-- Register Link -->
        <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
                Don't have an account? 
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="font-medium text-indigo-600 hover:text-indigo-800 transition duration-200">
                        Sign up
                    </a>
                @endif
            </p>
        </div>
    </div>
    
    <script>
        // Toggle password visibility
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const passwordIcon = document.getElementById('password-icon');
            
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
        
        // Add animation to error messages
        document.addEventListener('DOMContentLoaded', function() {
            const errorElements = document.querySelectorAll('.error-shake');
            errorElements.forEach(element => {
                element.classList.add('error-shake');
            });
        });
    </script>
</body>
</html> --}}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - {{$settings->site_name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden; /* Prevent horizontal scrollbar */
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            position: relative;
            overflow: hidden; /* Prevent overflow from shapes */
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
        }
        
        .floating-label {
            position: absolute;
            pointer-events: none;
            left: 12px;
            top: 12px;
            transition: 0.2s ease all;
            color: #9ca3af;
        }
        
        .password-toggle {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #9ca3af;
        }
        
        .login-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
        }
        
        .login-btn:hover {
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
        
        /* Custom input styles to remove default outline */
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
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <!-- Background Shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    
    <!-- Login Container -->
    <div class="glass-effect rounded-2xl shadow-2xl w-full max-w-md p-8 fade-in">
        <!-- Logo and Title -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-4">
                <i class="fas fa-user-shield text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p class="text-gray-600 mt-2">Sign in to continue to your account</p>
        </div>
        
        <!-- Session Status -->
        @if(session('status'))
            <div class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium fade-in">
                {{ session('status') }}
            </div>
        @endif
        
        <!-- Login Form -->
        <form method="POST" action="{{ route('login') }}" class="space-y-6">
            @csrf
            
            <!-- Email Address -->
            <div class="input-group">
                <x-text-input 
                    id="email" 
                    class="custom-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                    type="email" 
                    name="email" 
                    placeholder=" " 
                    :value="old('email')" 
                    required 
                    autofocus 
                    autocomplete="username" 
                />
                <label for="email" class="floating-label">Email Address</label>
                @error('email')
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            
            <!-- Password -->
            <div class="input-group">
                <x-text-input 
                    id="password" 
                    class="custom-input block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200" 
                    type="password" 
                    name="password" 
                    placeholder=" " 
                    required 
                    autocomplete="current-password" 
                />
                <label for="password" class="floating-label">Password</label>
                <div class="password-toggle" onclick="togglePassword()">
                    <i id="password-icon" class="fas fa-eye"></i>
                </div>
                @error('password')
                    <div class="mt-2 p-2 bg-red-100 text-red-700 rounded text-sm font-medium error-shake">
                        {{ $message }}
                    </div>
                @enderror
            </div>
            
            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" name="remember">
                    <label for="remember_me" class="ml-2 block text-sm text-gray-700">
                        Remember me
                    </label>
                </div>
                
                @if (Route::has('password.request'))
                    <a class="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-200" href="{{ route('password.request') }}">
                        Forgot your password?
                    </a>
                @endif
            </div>
            
            <!-- Login Button -->
            <div>
                <button type="submit" class="login-btn w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="mr-2">Sign In</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </form>
        
        <!-- Register Link -->
        <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
                Don't have an account? 
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="font-medium text-indigo-600 hover:text-indigo-800 transition duration-200">
                        Sign up
                    </a>
                @endif
            </p>
        </div>
    </div>
    
    <script>
        // Toggle password visibility
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const passwordIcon = document.getElementById('password-icon');
            
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
        
        // Add animation to error messages
        document.addEventListener('DOMContentLoaded', function() {
            const errorElements = document.querySelectorAll('.error-shake');
            errorElements.forEach(element => {
                element.classList.add('error-shake');
            });
        });
    </script>
</body>
</html>
