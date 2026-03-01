const { useState, useEffect, useRef } = React;

// Icon Components using Lucide
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const iconRef = useRef(null);
    
    useEffect(() => {
        if (iconRef.current && window.lucide) {
            window.lucide.createIcons({
                icons: window.lucide,
                nameAttr: 'data-lucide',
                attrs: {
                    'stroke-width': 2,
                }
            });
        }
    }, [name]);
    
    return <i ref={iconRef} data-lucide={name} className={className} style={{ width: size, height: size, color }}></i>;
};

// Navigation Component
const Navigation = ({ scrollToSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const navItems = [
        { name: 'Home', id: 'hero' },
        { name: 'Plan Trip', id: 'planner' },
        { name: 'Destinations', id: 'destinations' },
        { name: 'Features', id: 'features' },
        { name: 'Testimonials', id: 'testimonials' }
    ];
    
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2">
                        <Icon name="plane" size={32} className={`${isScrolled ? 'text-purple-600' : 'text-white'}`} />
                        <span className={`text-2xl font-bold font-display ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                            AI Travel
                        </span>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-200'}`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                    
                    <div className="hidden md:block">
                        <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all">
                            Get Started
                        </button>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Icon name={isMobileMenuOpen ? "x" : "menu"} size={28} className={isScrolled ? 'text-gray-900' : 'text-white'} />
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    scrollToSection(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium"
                            >
                                {item.name}
                            </button>
                        ))}
                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-medium">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Hero Section Component
const HeroSection = ({ scrollToSection }) => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80" 
                    alt="Travel Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 hero-gradient"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
                        Plan Your Dream Trip<br />
                        <span className="text-yellow-300">With AI</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
                        Discover personalized travel itineraries powered by artificial intelligence. 
                        Your perfect adventure awaits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => scrollToSection('planner')}
                            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                        >
                            Start Planning
                        </button>
                        <button 
                            onClick={() => scrollToSection('destinations')}
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all"
                        >
                            Explore Destinations
                        </button>
                    </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
                    {[
                        { number: '10K+', label: 'Happy Travelers' },
                        { number: '150+', label: 'Destinations' },
                        { number: '4.9★', label: 'Average Rating' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-sm md:text-base text-purple-100">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <Icon name="chevron-down" size={32} className="text-white" />
            </div>
        </section>
    );
};

// Trip Planner Form Component
const TripPlannerForm = ({ onGenerateItinerary }) => {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        travelers: 2,
        budget: 5000,
        preferences: []
    });
    
    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
    
    const destinations = [
        'Paris, France', 'Tokyo, Japan', 'New York, USA', 'Bali, Indonesia',
        'Rome, Italy', 'Barcelona, Spain', 'London, UK', 'Dubai, UAE',
        'Santorini, Greece', 'Maldives', 'Iceland', 'Thailand'
    ];
    
    const preferences = [
        { id: 'adventure', label: 'Adventure', icon: 'mountain' },
        { id: 'relaxation', label: 'Relaxation', icon: 'umbrella' },
        { id: 'culture', label: 'Culture', icon: 'landmark' },
        { id: 'food', label: 'Food & Dining', icon: 'utensils' },
        { id: 'shopping', label: 'Shopping', icon: 'shopping-bag' },
        { id: 'nature', label: 'Nature', icon: 'tree-pine' }
    ];
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.destination && formData.startDate && formData.endDate) {
            onGenerateItinerary(formData);
        }
    };
    
    const togglePreference = (prefId) => {
        setFormData(prev => ({
            ...prev,
            preferences: prev.preferences.includes(prefId)
                ? prev.preferences.filter(p => p !== prefId)
                : [...prev.preferences, prefId]
        }));
    };
    
    return (
        <section id="planner" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
                        Plan Your <span className="gradient-text">Perfect Trip</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Tell us your preferences and let AI create a personalized itinerary
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    {/* Destination Input */}
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 font-semibold mb-2">
                            <Icon name="map-pin" size={20} className="inline mr-2" />
                            Destination
                        </label>
                        <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) => {
                                setFormData({...formData, destination: e.target.value});
                                setShowDestinationSuggestions(true);
                            }}
                            onFocus={() => setShowDestinationSuggestions(true)}
                            placeholder="Where do you want to go?"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                            required
                        />
                        {showDestinationSuggestions && formData.destination && (
                            <div className="absolute z-10 w-full bg-white border-2 border-gray-200 rounded-xl mt-2 shadow-lg max-h-48 overflow-y-auto">
                                {destinations
                                    .filter(dest => dest.toLowerCase().includes(formData.destination.toLowerCase()))
                                    .map((dest, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => {
                                                setFormData({...formData, destination: dest});
                                                setShowDestinationSuggestions(false);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors"
                                        >
                                            {dest}
                                        </button>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    
                    {/* Date Inputs */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                <Icon name="calendar" size={20} className="inline mr-2" />
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                <Icon name="calendar" size={20} className="inline mr-2" />
                                End Date
                            </label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                min={formData.startDate || new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>
                    
                    {/* Travelers Count */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            <Icon name="users" size={20} className="inline mr-2" />
                            Number of Travelers: <span className="text-purple-600">{formData.travelers}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.travelers}
                            onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>1</span>
                            <span>10</span>
                        </div>
                    </div>
                    
                    {/* Budget Slider */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            <Icon name="wallet" size={20} className="inline mr-2" />
                            Budget: <span className="text-purple-600">${formData.budget.toLocaleString()}</span>
                        </label>
                        <input
                            type="range"
                            min="500"
                            max="20000"
                            step="500"
                            value={formData.budget}
                            onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>$500</span>
                            <span>$20,000</span>
                        </div>
                    </div>
                    
                    {/* Preferences */}
                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-4">
                            <Icon name="heart" size={20} className="inline mr-2" />
                            Travel Preferences
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {preferences.map(pref => (
                                <button
                                    key={pref.id}
                                    type="button"
                                    onClick={() => togglePreference(pref.id)}
                                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all ${
                                        formData.preferences.includes(pref.id)
                                            ? 'bg-purple-600 text-white border-purple-600'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                                    }`}
                                >
                                    <Icon name={pref.icon} size={18} />
                                    <span className="font-medium">{pref.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <Icon name="sparkles" size={24} />
                        <span>Generate AI Itinerary</span>
                    </button>
                </form>
            </div>
        </section>
    );
};

// AI Itinerary Display Component
const AIItineraryDisplay = ({ itinerary, isLoading }) => {
    if (isLoading) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="loading-spinner mx-auto mb-6"></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Creating Your Perfect Itinerary...</h3>
                    <p className="text-gray-600">AI is analyzing your preferences and crafting the best plan</p>
                </div>
            </section>
        );
    }
    
    if (!itinerary) return null;
    
    return (
        <section id="itinerary" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                        <Icon name="check-circle" size={20} />
                        <span className="font-semibold">Itinerary Generated!</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
                        Your Trip to <span className="gradient-text">{itinerary.destination}</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        {itinerary.duration} days of amazing experiences
                    </p>
                </div>
                
                {/* Trip Summary Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
                        <Icon name="calendar-days" size={32} className="mb-3" />
                        <div className="text-3xl font-bold mb-1">{itinerary.duration} Days</div>
                        <div className="text-purple-100">Total Duration</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
                        <Icon name="dollar-sign" size={32} className="mb-3" />
                        <div className="text-3xl font-bold mb-1">${itinerary.estimatedCost}</div>
                        <div className="text-blue-100">Estimated Cost</div>
                    </div>
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-2xl">
                        <Icon name="map" size={32} className="mb-3" />
                        <div className="text-3xl font-bold mb-1">{itinerary.activities}</div>
                        <div className="text-teal-100">Activities Planned</div>
                    </div>
                </div>
                
                {/* Day-by-Day Itinerary */}
                <div className="space-y-6">
                    {itinerary.days.map((day, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 md:p-8 card-hover">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
                                    Day {day.day}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{day.title}</h3>
                                    
                                    {/* Activities */}
                                    <div className="space-y-4 mb-4">
                                        {day.schedule.map((item, idx) => (
                                            <div key={idx} className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 mt-1">
                                                    <Icon name="clock" size={18} className="text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{item.time} - {item.activity}</div>
                                                    <div className="text-gray-600 text-sm mt-1">{item.description}</div>
                                                    {item.cost && (
                                                        <div className="text-purple-600 font-medium text-sm mt-1">
                                                            Estimated cost: ${item.cost}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Recommendations */}
                                    {day.recommendations && (
                                        <div className="bg-white rounded-xl p-4 mt-4">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Icon name="lightbulb" size={18} className="text-yellow-500" />
                                                <span className="font-semibold text-gray-900">Pro Tips</span>
                                            </div>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                {day.recommendations.map((rec, idx) => (
                                                    <li key={idx}>• {rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                        <Icon name="download" size={20} />
                        <span>Download Itinerary</span>
                    </button>
                    <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2">
                        <Icon name="share-2" size={20} />
                        <span>Share Trip</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

// Explore Destinations Component
const ExploreDestinations = () => {
    const destinations = [
        {
            name: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            rating: 4.9,
            travelers: '2.5M',
            description: 'City of Love & Lights',
            price: 'From $1,200'
        },
        {
            name: 'Tokyo, Japan',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
            rating: 4.8,
            travelers: '1.8M',
            description: 'Modern Meets Tradition',
            price: 'From $1,500'
        },
        {
            name: 'Bali, Indonesia',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            rating: 4.9,
            travelers: '3.2M',
            description: 'Tropical Paradise',
            price: 'From $800'
        },
        {
            name: 'Santorini, Greece',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
            rating: 4.9,
            travelers: '1.2M',
            description: 'Stunning Sunsets',
            price: 'From $1,400'
        },
        {
            name: 'New York, USA',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
            rating: 4.7,
            travelers: '4.5M',
            description: 'The City That Never Sleeps',
            price: 'From $1,000'
        },
        {
            name: 'Dubai, UAE',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
            rating: 4.8,
            travelers: '2.1M',
            description: 'Luxury & Innovation',
            price: 'From $1,600'
        }
    ];
    
    return (
        <section id="destinations" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
                        Explore Popular <span className="gradient-text">Destinations</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover amazing places around the world with AI-powered recommendations
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, index) => (
                        <div key={index} className="destination-card bg-white rounded-2xl overflow-hidden shadow-lg card-hover cursor-pointer">
                            <div className="relative h-64">
                                <img 
                                    src={dest.image} 
                                    alt={dest.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="destination-card-content absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="flex items-center bg-white bg-opacity-90 px-2 py-1 rounded-full">
                                            <Icon name="star" size={14} className="text-yellow-500" />
                                            <span className="text-sm font-bold ml-1">{dest.rating}</span>
                                        </div>
                                        <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
                                            {dest.travelers} travelers
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                                    <p className="text-white text-sm">{dest.description}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-purple-600 font-bold text-lg">{dest.price}</span>
                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-1">
                                        <span>Explore</span>
                                        <Icon name="arrow-right" size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Features Section Component
const FeaturesSection = () => {
    const features = [
        {
            icon: 'brain',
            title: 'AI-Powered Planning',
            description: 'Advanced algorithms analyze millions of data points to create the perfect itinerary tailored to your preferences.',
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: 'dollar-sign',
            title: 'Budget Optimization',
            description: 'Get the most value for your money with smart recommendations that maximize experiences while staying within budget.',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: 'clock',
            title: 'Real-Time Updates',
            description: 'Stay informed with live updates on weather, events, and travel conditions to make the most of your trip.',
            color: 'from-teal-500 to-teal-600'
        },
        {
            icon: 'map',
            title: 'Interactive Maps',
            description: 'Visualize your journey with detailed maps, routes, and points of interest at every destination.',
            color: 'from-orange-500 to-orange-600'
        },
        {
            icon: 'shield',
            title: 'Travel Insurance',
            description: 'Comprehensive coverage options to protect your trip and give you peace of mind while traveling.',
            color: 'from-red-500 to-red-600'
        },
        {
            icon: 'headphones',
            title: '24/7 Support',
            description: 'Round-the-clock customer support to assist you before, during, and after your journey.',
            color: 'from-indigo-500 to-indigo-600'
        }
    ];
    
    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
                        Powerful <span className="gradient-text">Features</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need for the perfect trip, powered by cutting-edge AI technology
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-purple-50 p-8 rounded-2xl card-hover">
                            <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <Icon name={feature.icon} size={32} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Interactive Map Component
const InteractiveMap = ({ destination }) => {
    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
                        Visualize Your <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Interactive maps to explore your travel route and destinations
                    </p>
                </div>
                
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative h-96 md:h-[600px] bg-gray-100 flex items-center justify-center">
                        {/* Placeholder for map - In a real app, this would use Google Maps API or Mapbox */}
                        <img 
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
                            alt="World Map"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                            <div className="text-center text-white">
                                <Icon name="map-pin" size={64} className="mx-auto mb-4 animate-pulse-slow" />
                                <h3 className="text-3xl font-bold mb-2">Interactive Map</h3>
                                <p className="text-lg">Explore destinations, routes, and attractions</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Map Controls */}
                    <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-500">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: 'navigation', label: 'View Route' },
                                { icon: 'hotel', label: 'Hotels' },
                                { icon: 'utensils', label: 'Restaurants' },
                                { icon: 'camera', label: 'Attractions' }
                            ].map((item, index) => (
                                <button key={index} className="bg-white text-purple-600 px-4 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2">
                                    <Icon name={item.icon} size={20} />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Testimonials Component
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            location: 'New York, USA',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=1',
            text: 'This AI travel planner completely transformed how I plan trips! The itinerary was perfect and saved me hours of research. Highly recommended!'
        },
        {
            name: 'Michael Chen',
            location: 'Singapore',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=12',
            text: 'Incredible experience! The AI understood exactly what I wanted and created an amazing 2-week European adventure within my budget.'
        },
        {
            name: 'Emma Williams',
            location: 'London, UK',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=5',
            text: 'Best travel planning tool I\'ve ever used. The personalized recommendations were spot-on, and the interface is so intuitive!'
        },
        {
            name: 'David Martinez',
            location: 'Barcelona, Spain',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=13',
            text: 'As a frequent traveler, this tool is a game-changer. It considers everything from budget to preferences and creates perfect itineraries.'
        },
        {
            name: 'Sophie Anderson',
            location: 'Melbourne, Australia',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=9',
            text: 'Planned my dream honeymoon to Bali using this platform. Every detail was perfectly thought out. Thank you for making it so special!'
        },
        {
            name: 'James Wilson',
            location: 'Toronto, Canada',
            rating: 5,
            image: 'https://i.pravatar.cc/150?img=14',
            text: 'The AI suggestions were incredibly accurate. It felt like having a personal travel agent who really knows what I like!'
        }
    ];
    
    return (
        <section id="testimonials" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
                        What Our <span className="gradient-text">Travelers Say</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of happy travelers who've discovered their perfect trips with AI
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-purple-50 p-8 rounded-2xl card-hover">
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Icon key={i} name="star" size={20} className="text-yellow-500 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                            <div className="flex items-center">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Icon name="plane" size={32} className="text-purple-400" />
                            <span className="text-2xl font-bold font-display">AI Travel</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Plan your dream trips with the power of artificial intelligence
                        </p>
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <button key={social} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                                    <Icon name={social} size={18} />
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'About Us', 'How It Works', 'Destinations', 'Pricing', 'Blog'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'FAQ', 'Travel Guide'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
                        <p className="text-gray-400 mb-4">Get travel tips and exclusive deals</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
                            />
                            <button className="bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 rounded-r-lg hover:shadow-lg transition-all">
                                <Icon name="send" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {currentYear} AI Travel Planner. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
const App = () => {
    const [itinerary, setItinerary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    const generateItinerary = (formData) => {
        setIsLoading(true);
        setItinerary(null);
        
        // Scroll to itinerary section
        setTimeout(() => {
            const element = document.getElementById('itinerary');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
        
        // Simulate AI processing
        setTimeout(() => {
            const startDate = new Date(formData.startDate);
            const endDate = new Date(formData.endDate);
            const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            
            // Generate sample itinerary
            const days = [];
            for (let i = 1; i <= duration; i++) {
                days.push({
                    day: i,
                    title: i === 1 ? 'Arrival & Exploration' : i === duration ? 'Departure Day' : `Adventure Day ${i}`,
                    schedule: [
                        { time: '09:00', activity: 'Morning Activity', description: 'Start your day with an exciting local experience', cost: 50 },
                        { time: '12:00', activity: 'Lunch', description: 'Try authentic local cuisine at a recommended restaurant', cost: 30 },
                        { time: '14:00', activity: 'Afternoon Exploration', description: 'Visit famous landmarks and attractions', cost: 40 },
                        { time: '18:00', activity: 'Evening Experience', description: 'Enjoy sunset views and cultural activities', cost: 35 }
                    ],
                    recommendations: [
                        'Book tickets in advance to skip the lines',
                        'Wear comfortable shoes for walking',
                        'Bring a water bottle and sunscreen'
                    ]
                });
            }
            
            const newItinerary = {
                destination: formData.destination,
                duration: duration,
                estimatedCost: formData.budget,
                activities: duration * 4,
                days: days
            };
            
            setItinerary(newItinerary);
            setIsLoading(false);
        }, 3000);
    };
    
    return (
        <div className="smooth-scroll">
            <Navigation scrollToSection={scrollToSection} />
            <HeroSection scrollToSection={scrollToSection} />
            <TripPlannerForm onGenerateItinerary={generateItinerary} />
            <AIItineraryDisplay itinerary={itinerary} isLoading={isLoading} />
            <ExploreDestinations />
            <FeaturesSection />
            <InteractiveMap />
            <TestimonialsSection />
            <Footer />
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
