import { useEffect, useState } from "react";
import axios from "axios";
import { Home, MapPin, Square, Bed, Bath, Calculator, TrendingUp, IndianRupee, Sparkles, Building2, Award, BarChart3 } from "lucide-react";

function App() {
  const [locations, setLocations] = useState<string[]>([]);
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("");
  const [bath, setBath] = useState("");
  const [location, setLocation] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch locations from backend on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_location_names");
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Handle price estimation
  const handleEstimatePrice = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict_home_price", {
        total_sqft: sqft,   
        location: location,
        bhk: bhk,
        bath: bath
      });

      setEstimatedPrice(response.data.estimated_price.toString() + " Lakh");
    } catch (error) {
      console.error("Failed to estimate price:", error);
      setEstimatedPrice("Error estimating price");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
                  <Home className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Bangalore Property Oracle
                </h1>
                <p className="text-white/60 text-sm font-medium">AI-Powered Real Estate Valuation Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/80">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">Premium AI Model</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <BarChart3 className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">95% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid xl:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5 rounded-xl">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Property Configuration</h2>
                  <p className="text-white/60">Enter your property details for precise valuation</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Area input */}
                <div className="group">
                  <label className="flex items-center gap-3 text-sm font-semibold text-white/90 mb-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1.5 rounded-lg">
                      <Square className="h-4 w-4 text-white" />
                    </div>
                    Total Area (Square Feet)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="e.g., 1200"
                      className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 text-lg font-medium hover:bg-white/10"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* BHK input */}
                <div className="group">
                  <label className="flex items-center gap-3 text-sm font-semibold text-white/90 mb-3">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-1.5 rounded-lg">
                      <Bed className="h-4 w-4 text-white" />
                    </div>
                    Bedrooms (BHK)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      placeholder="e.g., 3"
                      className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all duration-300 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 text-lg font-medium hover:bg-white/10"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Bathrooms input */}
                <div className="group">
                  <label className="flex items-center gap-3 text-sm font-semibold text-white/90 mb-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1.5 rounded-lg">
                      <Bath className="h-4 w-4 text-white" />
                    </div>
                    Bathrooms
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={bath}
                      onChange={(e) => setBath(e.target.value)}
                      placeholder="e.g., 2"
                      className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 text-lg font-medium hover:bg-white/10"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Location dropdown */}
                <div className="group">
                  <label className="flex items-center gap-3 text-sm font-semibold text-white/90 mb-3">
                    <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-1.5 rounded-lg">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    Prime Location
                  </label>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border border-white/20 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/20 transition-all duration-300 bg-white/5 backdrop-blur-xl text-white text-lg font-medium appearance-none cursor-pointer hover:bg-white/10"
                    >
                      <option value="" className="bg-slate-800 text-white">Select premium location</option>
                      {locations.map((loc, index) => (
                        <option key={index} value={loc} className="bg-slate-800 text-white">
                          {loc}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Estimate button */}
              <div className="mt-8">
                <button
                  onClick={handleEstimatePrice}
                  disabled={!sqft || !bhk || !bath || !location || isLoading}
                  className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-blue-500/25 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                      <span>Analyzing Property...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-6 w-6 group-hover:animate-pulse" />
                      <span>Estimate Price</span>
                      <TrendingUp className="h-6 w-6 group-hover:animate-bounce" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Result Display */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 h-fit">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-emerald-500 to-green-500 p-2.5 rounded-xl">
                    <IndianRupee className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Valuation</h2>
                  <p className="text-white/60">Powered by advanced ML algorithms</p>
                </div>
              </div>

              {estimatedPrice ? (
                <div className="text-center">
                  <div className="relative bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-3xl p-8 border border-emerald-500/30 backdrop-blur-xl mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl animate-pulse"></div>
                    <div className="relative">
                      <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-2xl">
                        <Building2 className="h-10 w-10 text-white animate-pulse" />
                      </div>
                      <h3 className="text-sm font-semibold text-emerald-300 mb-3 uppercase tracking-wider">Estimated Market Value</h3>
                      <p className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent mb-2 animate-pulse">
                        ₹{estimatedPrice}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-emerald-300 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span>Market Competitive</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                    <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Home className="h-10 w-10 text-white/60" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Ready for Analysis</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Complete all property details above and click "Generate AI Valuation" to receive an instant, accurate market price estimate powered by our advanced algorithms.
                    </p>
                  </div>
                </div>
              )}

         
              <div className="mt-8 grid grid-cols-1 gap-4">
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;