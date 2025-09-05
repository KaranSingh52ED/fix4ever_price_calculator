import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IndianRupee,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Percent,
  Target,
  BarChart3,
  Clock,
} from "lucide-react";

export default function Calculator() {
  const [p, setP] = useState<string>("");
  const [c, setC] = useState<string>("");
  const M = 200;
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  function calculate() {
    setIsCalculating(true);
    setShowBreakdown(false);
    setAnimationKey((prev) => prev + 1);

    setTimeout(() => {
      const pValue = parseFloat(p) || 0;
      const cValue = parseFloat(c) || 0;
      const output = pValue + pValue * 0.2 + cValue + cValue * 0.2 + M;
      setResult(output);
      setIsCalculating(false);
      setShowBreakdown(true);
    }, 800);
  }

  function reset() {
    setP("");
    setC("");
    setResult(null);
    setShowBreakdown(false);
    setAnimationKey((prev) => prev + 1);
  }

  const canCalculate =
    (p !== "" && parseFloat(p) > 0) || (c !== "" && parseFloat(c) > 0);
  const pValue = parseFloat(p) || 0;
  const cValue = parseFloat(c) || 0;
  const pWithSurcharge = pValue * 1.2;
  const cWithSurcharge = cValue * 1.2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <img
              src="https://res.cloudinary.com/dd8zhmj7u/image/upload/v1753045196/ssw12aalzfgrc50kyked.jpg"
              alt="Fix4Ever"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Fix4Ever Price Calculator
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-4">
            Professional calculation tool with automatic surcharge computation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-4">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              <Sparkles className="w-2.5 h-2.5 mr-1" />
              Premium
            </Badge>
            <Badge variant="outline" className="px-2 py-0.5 text-xs">
              <Target className="w-2.5 h-2.5 mr-1" />P + P×20% + C + C×20% + M
            </Badge>
          </div>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Calculation Parameters
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Enter values for P and C parameters. M is fixed at ₹{M}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reset}
                  className="gap-1 text-xs h-8 px-3"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            {/* Input Fields */}
            <div className="grid gap-3 sm:gap-4">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="p-input"
                      className="text-xs sm:text-sm font-semibold flex items-center gap-2"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        P
                      </div>
                      Parameter P
                    </Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input
                        id="p-input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={p}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setP(e.target.value)
                        }
                        placeholder="0.00"
                        className="text-sm sm:text-base font-medium pl-7 h-9 sm:h-10 border-2 focus:border-primary transition-colors"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Percent className="w-2.5 h-2.5" />
                      Base amount (20% surcharge added automatically)
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="c-input"
                      className="text-xs sm:text-sm font-semibold flex items-center gap-2"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                        C
                      </div>
                      Parameter C
                    </Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input
                        id="c-input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={c}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setC(e.target.value)
                        }
                        placeholder="0.00"
                        className="text-sm sm:text-base font-medium pl-7 h-9 sm:h-10 border-2 focus:border-primary transition-colors"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Percent className="w-2.5 h-2.5" />
                      Additional charge (20% surcharge added automatically)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="space-y-1.5">
                  <Label className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      M
                    </div>
                    Parameter M (Fixed)
                  </Label>
                  <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                    <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      ₹{M}.00
                    </span>
                    <Badge
                      variant="secondary"
                      className="ml-auto px-2 py-0.5 text-xs"
                    >
                      <Clock className="w-2.5 h-2.5 mr-1" />
                      Fixed
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fixed maintenance charge (non-negotiable)
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-4 sm:my-6" />

            {/* Calculation Button */}
            <Button
              onClick={calculate}
              disabled={!canCalculate || isCalculating}
              className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-b-2 border-white mr-2" />
                  Calculating...
                </>
              ) : (
                <>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                  Calculate Total
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
                </>
              )}
            </Button>

            {/* Result Display */}
            {result !== null && (
              <div
                key={animationKey}
                className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-teal-950/50 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/50">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-green-700 dark:text-green-300">
                        Calculation Complete
                      </h3>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Total amount calculated successfully
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 text-xs px-2 py-0.5"
                  >
                    <BarChart3 className="w-2.5 h-2.5 mr-1" />
                    Result
                  </Badge>
                </div>

                <div className="text-center py-2 sm:py-3">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
                    ₹
                    {result.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Final Total Amount
                  </p>
                </div>

                {/* Breakdown */}
                {showBreakdown && (
                  <div className="space-y-2 sm:space-y-3">
                    <Separator />
                    <div className="space-y-1.5 sm:space-y-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-green-700 dark:text-green-300 flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        Detailed Breakdown
                      </h4>

                      <div className="grid gap-1.5 sm:gap-2">
                        <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                              P
                            </div>
                            <span className="text-xs font-medium">
                              P + 20% surcharge:
                            </span>
                          </div>
                          <span className="font-semibold text-xs sm:text-sm">
                            ₹
                            {pWithSurcharge.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400">
                              C
                            </div>
                            <span className="text-xs font-medium">
                              C + 20% surcharge:
                            </span>
                          </div>
                          <span className="font-semibold text-xs sm:text-sm">
                            ₹
                            {cWithSurcharge.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">
                              M
                            </div>
                            <span className="text-xs font-medium">
                              Fixed charge (M):
                            </span>
                          </div>
                          <span className="font-semibold text-xs sm:text-sm">
                            ₹{M}.00
                          </span>
                        </div>

                        <Separator className="my-1.5" />

                        <div className="flex justify-between items-center p-2.5 sm:p-3 bg-gradient-to-r from-primary/10 to-blue-600/10 dark:from-primary/20 dark:to-blue-600/20 rounded-lg border-2 border-primary/20">
                          <div className="flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-primary" />
                            <span className="font-semibold text-xs sm:text-sm">
                              Total Amount:
                            </span>
                          </div>
                          <span className="font-bold text-sm sm:text-base md:text-lg text-primary">
                            ₹
                            {result.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
